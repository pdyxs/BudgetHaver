import achievementSpecs from './specs';
import _ from 'lodash';
import moment from 'moment';
import Saveable, {LocalStorageService} from 'modules/saveable';
import { loop, Cmd } from 'redux-loop';

const saveable = new Saveable(
  'achievements',
  [{
    defaults: _(achievementSpecs).mapKeys(a => a.id).mapValues(() => ({
      achieved: false
    })).value(),
    sources: [LocalStorageService]
  }]
);

export const MARK_ACHIEVED   = `${PACKAGE_NAME}/achievements/mark-achieved`;

function getAchievementsTriggeredBy(triggeringAction) {
  return _.filter(achievementSpecs, spec =>
    _.includes(spec.type.triggers, triggeringAction)
  );
}

export function achievementCount({achievements}) {
  return _.filter(achievements, a => a.achieved).length;
}

function checkAchievements(achievementsToCheck = achievementSpecs)
{
  if (achievementsToCheck.length == 0) return;
  return (dispatch, getState) => {
    var state = getState();
    var {achievements} = state;
    _.forEach(achievementsToCheck, spec => {
      if (!achievements[spec.id].achieved && spec.type.check(spec.args, state)) {
        dispatch({
          type: MARK_ACHIEVED,
          achievement: spec.id
        });
      }
    });
  }
}

const reducer = saveable.buildReducer(
  (state, action, save) => {
    switch (action.type) {
      case MARK_ACHIEVED:
        return save(state,
          _.set({}, action.achievement, {
            achieved: true,
            achievementDate: moment().valueOf()
          })
        );
      default:
        return loop(state,
          Cmd.run(
            getAchievementsTriggeredBy, {
            successActionCreator: checkAchievements,
            args: [action.type]
          })
        );
    }
  }
)

export default reducer;
