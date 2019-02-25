import achievementSpecs from './specs';
import _ from 'lodash';
import moment from 'moment';
import {initState, saveState} from 'modules/saveable';
import { loop, Cmd } from 'redux-loop';

const MARK_ACHIEVED   = `${PACKAGE_NAME}/achievements/mark-achieved`;

const init = initState('achievements');
const save = saveState('achievements');

function getAchievementsTriggeredBy(triggeringAction) {
  return _.filter(achievementSpecs, spec =>
    _.includes(spec.type.triggers, triggeringAction)
  );
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

const initialState = init(
  _(achievementSpecs).mapKeys(a => a.id).mapValues(() => ({
    achieved: false
  })).value()
);

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case MARK_ACHIEVED:
      return {
        ...state,
        ...save(_.set({}, action.achievement, {
          achieved: true,
          achievementDate: moment().valueOf()
        }))
      };
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
