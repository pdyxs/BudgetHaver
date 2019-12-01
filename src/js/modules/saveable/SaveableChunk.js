import _ from 'lodash';

export default class SaveableChunk {
  constructor(
    saveable,
    {
      defaults,
      sources,
      mergeStrategy
    }
  ) {
    this.saveable = saveable;
    this.sources = sources || [];
    this.keys = _.keys(defaults);

    this.initialState = _.mapValues(defaults, (val, key) => {
      for (var i = this.sources.length - 1; i >= 0; --i) {
        var source = this.sources[i];
        if (source.isSynchronous) {
          var saved = source.get(saveable, key);
          if (saved) return saved;
        }
      }
      return val;
    });

    this.initialisedSources = _.map(this.sources, s => s.isSynchronous);
  }

  save(saveable, newState) {
    var toSave = _.pick(newState, this.keys);
    _.forEach(this.sources, source => source.save(saveable, toSave));
  }

  isAllInitialised() {
    return !_.includes(this.initialisedSources, false);
  }
}
