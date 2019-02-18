// recurrences.js
import moment from 'moment';
import {initState, saveState} from 'modules/saveable';
import uuid from 'uuid/v4';
import _ from 'lodash';

const init = initState('recurrences');
const save = saveState('recurrences');

const ADD_RECURRENCE      = 'budget-haver/recurrences/add';
const REMOVE_RECURRENCE   = 'budget-haver/recurrences/remove';

export const WEEKLY = 'Weekly';
export const MONTHLY = 'Monthly';
export const YEARLY = 'Yearly';

export const TIMINGS = [
  WEEKLY,
  MONTHLY,
  YEARLY
];

export function addRecurrence(name, timing, currency, amount) {
  return {
    type: ADD_RECURRENCE,
    recurrence: {
      id: uuid(),
      name,
      timing,
      currency,
      amount
    }
  };
}

export function removeRecurrence(id) {
  return {
    type: REMOVE_RECURRENCE,
    id
  }
}

const initialState = init({
  recurrences: []
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_RECURRENCE:
      return {
        ...state,
        ...save({
          recurrences: [
            ...state.recurrences,
            action.recurrence
          ]
        })
      };
    case REMOVE_RECURRENCE:
      return {
        ...state,
        ...save({
          recurrences: _.remove(state.recurrences, r => r.id == action.id)
        })
      };
    default:
      return state;
  }
}
