// history.js
import moment from 'moment';
import {initState, saveState} from 'modules/saveable';

const init = initState('history');
const save = saveState('history');

const ADD_RECORD    = 'budget-haver/history/add-record';

export function addHistoryRecord(amount)
{
  return {
    type: ADD_RECORD,
    amount
  };
}

const initialState = init({
  list: []
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        ...save({
          list: [...state.list, {
            date: moment().valueOf(),
            amount: action.amount
          }]
        })
      };
      break;
    default:
      return state;
  }
}
