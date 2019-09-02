import _ from 'lodash';
import moment from 'moment';
import EventEmitter from 'eventemitter3';

let CloudIsEnabled = false;
const bus = new EventEmitter();
let CloudSaveLock = false;
let CloudHasLoaded = false;

let CloudDebug = false;

export const MERGE_STRATEGY_USE_LATEST = `${PACKAGE_NAME}/saveable/merge-strategy/use-latest`;

export const UPDATE_FROM_CLOUD = `${PACKAGE_NAME}/saveable/udpate-from-cloud`;
export const SAVE_TO_CLOUD = `${PACKAGE_NAME}/saveable/save-to-cloud`;

function cloudSettingsExists() {
  return new Promise((resolve) => {
    cordova.plugin.cloudsettings.exists(resolve);
  });
}

function cloudSettingsLoad() {
  return new Promise((resolve, reject) => {
    cordova.plugin.cloudsettings.load(resolve, reject);
  });
}

function cloudSettingsSave(settings, overwrite = false) {
  return new Promise((resolve, reject) => {
    cordova.plugin.cloudsettings.save(settings, resolve, reject, overwrite);
  });
}

async function doCloudSave(settings, overwrite = false) {
  if (!CloudHasLoaded) return;
  if (CloudSaveLock) await new Promise(resolve => bus.once('unlocked', resolve));
  CloudSaveLock = true;
  var ret = null;
  try {
    ret = await cloudSettingsSave(settings, overwrite);
  } catch (e) {
    console.log(e);
  }
  CloudSaveLock = false;
  bus.emit('unlocked');
}

async function loadCloudDataAndOverwrite(dispatch) {
  var cloudData = await cloudSettingsLoad();
  if (CloudDebug)
  {
    console.log("cloud data");
    console.log(cloudData);
  }
  dispatch({
    type: UPDATE_FROM_CLOUD,
    cloudData
  });
  return;
}

async function runInitialiseCloud(dispatch, getState) {
  if (!cordova?.plugin?.cloudsettings) {
    console.log("Cordova CloudSettings plugin not initialised");
    return;
  }

  cordova.plugin.cloudsettings.enableDebug();

  var settingsExists = false;
  try {
    settingsExists = await cloudSettingsExists();
    CloudIsEnabled = true;

    if (CloudIsEnabled)
    {
      if (CloudDebug)
        console.log(`cloud enabled: ${CloudIsEnabled}, settings exists: ${settingsExists}`);
      await doCloudSave({}, true);
      if (settingsExists) {
        await loadCloudDataAndOverwrite(dispatch);
        CloudHasLoaded = true;
      } else {
        if (navigator.connection.type &&
          navigator.connection.type !== Connection.NONE) {
            CloudHasLoaded = true;
            dispatch({
              type: SAVE_TO_CLOUD
            });
        } else {
          document.addEventListener("online", () => {
            runInitialiseCloud(dispatch, getState);
          }, false);
          return;
        }
      }

      cordova.plugin.cloudsettings.onRestore(
        () => loadCloudDataAndOverwrite(dispatch)
      );
    }
  } catch (e) {
    console.log(e);
  }
}

export function initialiseCloud() {
  return runInitialiseCloud;
}

export default class Saveable {
  constructor(name, {
    initialSaveable = {},
    initialNonSaveable = {},
    useCloud = false,
    mergeStrategy = MERGE_STRATEGY_USE_LATEST
  }) {
    this.name = name;
    this.useCloud = useCloud;
    this.mergeStrategy = mergeStrategy;

    this.#initialiseState(initialSaveable, initialNonSaveable);
  }

  #initialiseState(initialSaveable, initialNonSaveable) {
    this.savedKeys = _.keys(initialSaveable);
    this.nonSavedKeys = _.keys(initialNonSaveable);

    this.initialState = {
      ..._.mapValues(initialSaveable, (val, key) => {
        var item = localStorage.getItem(`${this.name}/${key}`);
        if (item) return JSON.parse(item);
        localStorage.setItem(`${this.name}/${key}`, JSON.stringify(val));
        return val;
      }),
      ...initialNonSaveable
    };

    if (this.useCloud) {
      this.savedKeys.push('lastEdit');
      if (!this.initialState.lastEdit) {
        this.initialState.lastEdit = 0;
      }
    }
    if (CloudDebug) {
      console.log(`initial state of ${this.name}`);
      console.log(this.initialState);
    }
  }

  saveLocal = (newState) => {
    var stateToSave = _.pick(newState, this.savedKeys);
    _.forEach(stateToSave, (val, key) => {
      localStorage.setItem(`${this.name}/${key}`, JSON.stringify(val));
    });
    return newState;
  }

  save = (state, newState, useCloud = true) => {
    if (this.useCloud && useCloud)
    {
      newState.lastEdit = moment().valueOf();
    }

    newState = {
      ...state,
      ...newState
    };
    this.saveLocal(state, newState);

    if (this.useCloud && CloudIsEnabled && useCloud) {
      this.cloudSave(newState);
    }
    return newState;
  }

  async cloudSave(newState) {
    newState.lastEdit = moment().valueOf();
    try {
      if (CloudDebug) {
        console.log(`saving to cloud: ${this.name}`);
        console.log(newState);
      }
      newState = await doCloudSave(_.set({}, this.name, newState));
      if (CloudDebug) {
        console.log(`saved: ${this.name}`);
        console.log(newState);
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    }
    return newState;
  }

  buildReducer = (reducer) => {
    return (state = this.initialState, action = {}) => {
      if (this.useCloud)
      {
        switch (action.type) {
          case UPDATE_FROM_CLOUD:
            if (action.cloudData[this.name])
            {
              switch (this.mergeStrategy) {
                case MERGE_STRATEGY_USE_LATEST:
                  if ((action.cloudData[this.name].lastEdit || 0) > state.lastEdit)
                  {
                    return {
                      ..._.pick(state, this.nonSavedKeys),
                      ...this.saveLocal(action.cloudData[this.name])
                    }
                  }
                default:
                  return state;
              }
            } else {
              this.cloudSave(_.pick(state, this.savedKeys));
              return state;
            }

          case SAVE_TO_CLOUD:
            this.cloudSave(_.pick(state, this.savedKeys));
            return state;
        }
      }
      return reducer(state, action, this.save);
    }
  }
}
