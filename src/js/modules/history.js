// history.js
import moment from 'moment';
import {initState, saveState} from 'modules/saveable';
import { getInBaseCurrency } from 'modules/currencies';

const init = initState('history');
const save = saveState('history');

export const ADD_RECORD    = `${PACKAGE_NAME}/history/add-record`;

export function addHistoryRecord(amount)
{
  return (dispatch, getState) => {
    var {currencies} = getState();
    var transaction = [
      {
        currency: currencies.spendCurrency,
        amount
      }
    ];
    if (currencies.spendCurrency != currencies.baseCurrency) {
      transaction.push({
        currency: currencies.baseCurrency,
        amount: getInBaseCurrency(amount, currencies.spendCurrency, currencies)
      });
    }
    dispatch({
      type: ADD_RECORD,
      transaction
    });
  }
}

const initialState = //init(
  {list: []}
// );

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        ...save({
          list: [...state.list, {
            date: moment().valueOf(),
            transaction: action.transaction
          }]
        })
      };
      break;
    default:
      return state;
  }
}
