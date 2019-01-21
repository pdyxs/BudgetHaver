// history.js
import moment from 'moment';

const ADD_RECORD    = 'budget-haver/history/add-record';

export function addHistoryRecord(amount)
{
  return {
    type: ADD_RECORD,
    amount
  };
}

const initialState = {
  list: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        list: [...state.list, {
          date: moment().valueOf(),
          amount: action.amount
        }]
      };
      break;
    default:
      return state;
  }
}
