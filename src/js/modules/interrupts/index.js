import _ from 'lodash';
import moment from 'moment';
import Saveable, {LocalStorageService} from 'modules/saveable';
import { loop, Cmd } from 'redux-loop';

import interruptTypes from './types';

const saveable = new Saveable(
  'interrupts',
  [{
    defaults: {complete: _(interruptTypes).mapKeys(i => i.id).mapValues(i => 0).value()},
    sources: [LocalStorageService]
  },
  {
    defaults: {active: []}
  }]
);

export const ADD_INTERRUPT      = `${PACKAGE_NAME}/interrupts/add`;
export const COMPLETE_INTERRUPT = `${PACKAGE_NAME}/interrupts/complete`;

export function completeInterrupt() {
  return {
    type: COMPLETE_INTERRUPT
  };
}

function getInterruptsTriggeredBy(triggeringAction, state) {
  var ret = _.filter(interruptTypes,
    i => i.trigger == triggeringAction.type &&
         (!i.maxRepetitions || state.complete[i.id] < i.maxRepetitions));
  if (ret.length == 0) return null;
  return {
    action:triggeringAction,
    potentials: ret
  };
}

function addInterrupt(args) {
  if (args == null) return;
  const {potentials, action} = args;

  return (dispatch, getState) => {
    var state = getState();
    var interrupt = _.find(potentials, i => !i.check || i.check(state, action));
    if (!interrupt) return;
    dispatch({
      type: ADD_INTERRUPT,
      interruptType: interrupt.id,
      trigger: action
    });
  }
}

const reducer = saveable.buildReducer((state, action, save) => {
  switch (action.type) {
    case ADD_INTERRUPT:
      return save(state, {
        active: [
          ...state.active,
          {
            type: action.interruptType,
            trigger: action.trigger
          }
        ]
      });

    case COMPLETE_INTERRUPT:
      var ret = save(state, {
        active: _.tail(state.active),
        complete: _.set(state.complete, state.active[0].type, state.complete[state.active[0].type] + 1)
      });
      var completedAction = _.find(interruptTypes, {id: state.active[0].type})?.completedAction;
      if (completedAction) {
        if (_.isFunction(completedAction)) {
          return loop(ret, Cmd.action(completedAction()));
        } else {
          return loop(ret, Cmd.action(completedAction));
        }
      }
      return ret;
    default:
      return loop(state,
        Cmd.run(
          getInterruptsTriggeredBy, {
          successActionCreator: addInterrupt,
          args: [action, state]
        })
      )
  }
});

export default reducer;
