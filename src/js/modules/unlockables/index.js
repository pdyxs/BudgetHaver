import { starCount } from 'modules/stars';

const STARS = `stars`;

function is_unlocked(unlockable_id) {
  var unlockable = unlockables[unlockable_id];
  return (state) => unlockable.type.check(unlockable.args, state);
}

const types = {
  stars: {
    check: ({count}, state) => starCount(state) >= count
  }
}

const unlockables = _.keyBy([
  {
    id: STARS,
    type: types.stars,
    args: {
      count: 1
    }
  }
], u => u.id);

export const isUnlocked = _(unlockables).mapValues(u => is_unlocked(u.id))
                                        .value();
