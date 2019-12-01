import _ from 'lodash';
import SaveableChunk from './SaveableChunk';

export default class Saveable {
  constructor(name, chunkConfigs = []) {
    this.name = name;

    this.chunks = _.map(chunkConfigs, c => new SaveableChunk(this, c));

    this.#initialiseState();
  }

  #initialiseState() {
    this.keyChunks = {};
    for (var i = 0; i != this.chunks.length; ++i) {
      var chunk = this.chunks[i];
      this.keyChunks = {
        ...this.keyChunks,
        ..._.mapValues(_.keyBy(chunk.keys), k => i)
      };
    }
  }

  get initialState() {
    return _.mapValues(this.keyChunks,
      (chunk, key) => this.chunks[chunk].initialState[key]
    );
  }

  save = (state, newState) => {
    for (var i = 0; i != this.chunks.length; ++i) {
      this.chunks[i].save(this, newState);
    }
    return {
      ...state,
      ...newState
    };
  }

  // saveLocal = (newState) => {
  //   var stateToSave = _.pick(newState, this.savedKeys);
  //   _.forEach(stateToSave, (val, key) => {
  //     localStorage.setItem(`${this.name}/${key}`, JSON.stringify(val));
  //   });
  //   return newState;
  // }
  //
  // save = (state, newState, useCloud = true) => {
  //   if (this.useCloud && useCloud)
  //   {
  //     newState.lastEdit = moment().valueOf();
  //   }
  //
  //   newState = {
  //     ...state,
  //     ...newState
  //   };
  //   this.saveLocal(state, newState);
  //
  //   if (this.useCloud && CloudIsEnabled && useCloud) {
  //     this.cloudSave(newState);
  //   }
  //   return newState;
  // }
  //
  // async cloudSave(newState) {
  //   newState.lastEdit = moment().valueOf();
  //   try {
  //     if (CloudDebug) {
  //       console.log(`saving ${this.name} to cloud: ${JSON.stringify(newState)}`);
  //     }
  //     newState = await doCloudSave(_.set({}, this.name, newState));
  //   } catch (e) {
  //     console.log(JSON.stringify(e));
  //   }
  //   return newState;
  // }
  //
  buildReducer = (reducer) => {
    return (state = this.initialState, action = {}) => {
        return reducer(state, action, this.save);
      }
    }
  //     if (this.useCloud)
  //     {
  //       switch (action.type) {
  //         case UPDATE_FROM_CLOUD:
  //           if (action.cloudData[this.name])
  //           {
  //             switch (this.mergeStrategy) {
  //               case MERGE_STRATEGY_USE_LATEST:
  //                 if (action.cloudData[this.name].useCloud &&
  //                   (action.cloudData[this.name].lastEdit || 0) > state.lastEdit)
  //                 {
  //                   return {
  //                     ..._.pick(state, this.nonSavedKeys),
  //                     ...this.saveLocal(action.cloudData[this.name])
  //                   }
  //                 }
  //               default:
  //                 return state;
  //             }
  //           } else {
  //             this.cloudSave(_.pick(state, this.savedKeys));
  //             return state;
  //           }
  //
  //         case SAVE_TO_CLOUD:
  //           this.cloudSave(_.pick(state, this.savedKeys));
  //           return state;
  //       }
  //     }
}
