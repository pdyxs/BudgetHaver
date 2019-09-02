import _ from 'lodash';
import moment from 'moment';

var CloudIsEnabled = false;

export const MERGE_STRATEGY_USE_LATEST = `${PACKAGE_NAME}/saveable/merge-strategy/use-latest`;

export const UPDATE_FROM_CLOUD = `${PACKAGE_NAME}/saveable/udpate-from-cloud`;

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

function cloudSettingsSave(settings) {
  return new Promise((resolve, reject) => {
    cordova.plugin.cloudsettings.save(settings, resolve, reject);
  });
}

async function loadCloudDataAndOverwrite(dispatch) {
  var cloudData = await cloudSettingsLoad();
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
      if (settingsExists) {
        await loadCloudDataAndOverwrite(dispatch);
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

export class Saveable {
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
    this.initialState = {
      ..._.mapValues(initialSaveable, (val, key) => {
        var item = localStorage.getItem(`${this.name}/${key}`);
        if (item) return JSON.parse(item);
        localStorage.setItem(`${this.name}/${key}`, JSON.stringify(val));
        return val;
      }),
      ...initialNonSaveable
    };

    if (this.useCloud && !this.initialState.lastEdit) {
      this.initialState.lastEdit = 0;
    }
  }

  save = (state, newState) => {
    if (this.useCloud)
    {
      newState.lastEdit = moment().valueOf();
    }

    var newState = {
      ...state,
      ...newState
    };
    _.forEach(newState, (val, key) => {
      localStorage.setItem(`${this.name}/${key}`, JSON.stringify(val));
    });
    if (this.useCloud && CloudIsEnabled) {
      this.cloudSave(newState);
    }
    return newState;
  }

  async cloudSave(newState) {
    try {
      await cloudSettingsSave(_.set({}, this.name, newState));
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  buildReducer = (reducer) => {
    return (state = this.initialState, action = {}) => {
      if (this.useCloud)
      {
        switch (action.type) {
          case UPDATE_FROM_CLOUD:
            switch (this.mergeStrategy) {
              case MERGE_STRATEGY_USE_LATEST:
                if ((action.cloudData[this.name].lastEdit || 0) > state.lastEdit)
                  return action.cloudData[this.name];
              default:
                return state;
            }
        }
      }
      return reducer(state, action, this.save);
    }
  }
}

export function initState(name) {
  return (initialState) => {
    return _.mapValues(initialState, (val, key) => {
      var item = localStorage.getItem(`${name}/${key}`);
      if (item) return JSON.parse(item);
      localStorage.setItem(`${name}/${key}`, JSON.stringify(val));
      return val;
    });
  };
}

export function saveState(name) {
  return (state) => {
    _.forEach(state, (val, key) => {
      localStorage.setItem(`${name}/${key}`, JSON.stringify(val));
    });
    return state;
  }
}
