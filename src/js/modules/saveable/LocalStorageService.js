const LocalStorageService = {
  isSynchronous: true,
  save: (saveable, stateToSave) => {
    _.forEach(stateToSave, (val, key) => {
      localStorage.setItem(`${saveable.name}/${key}`, JSON.stringify(val));
    });
    return stateToSave;
  },
  get: (saveable, key) => {
    var item = localStorage.getItem(`${saveable.name}/${key}`);
    if (item) return JSON.parse(item);
    return undefined;
  }
}

export default LocalStorageService;
