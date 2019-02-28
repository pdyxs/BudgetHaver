import _ from 'lodash';
import moment from 'moment';
import {initState, saveState} from 'modules/saveable';
import { loop, Cmd } from 'redux-loop';

export const ADD_INTERRUPT      = `${PACKAGE_NAME}/interrupts/add`;
export const COMPLETE_INTERRUPT = `${PACKAGE_NAME}/interrupts/complete`;

import interruptTypes from './types';

const init = initState('interrupts');
const save = saveState('interrupts');

export function completeInterrupt() {
  return {
    type: COMPLETE_INTERRUPT
  };
}

const initialState = save({
  active: [],
  complete: _(interruptTypes).mapKeys(i => i.id).mapValues(i => 0).value()
});

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

export default function reducer(state = initialState, action={}) {
  switch (action.type) {
    case ADD_INTERRUPT:
      return {
        ...state,
        ...save({
          active: [
            ...state.active,
            {
              type: action.interruptType,
              trigger: action.trigger
            }
          ]
        })
      }

    case COMPLETE_INTERRUPT:
      return {
        ...state,
        ...save({
          active: _.tail(state.active),
          complete: _.set(state.complete, state.complete[state.active[0].type] + 1)
        })
      };

    default:
      return loop(state,
        Cmd.run(
          getInterruptsTriggeredBy, {
          successActionCreator: addInterrupt,
          args: [action, state]
        })
      )
  }
}
