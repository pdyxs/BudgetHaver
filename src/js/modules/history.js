// history.js
import moment from 'moment';
import Saveable from 'modules/saveable';
import { getInCurrency, getInBaseCurrency } from 'modules/currencies';
import { changeBalance } from 'modules/budget';

const saveable = new Saveable(
  'history',
  {
    initialSaveable: {
      list: []
    },
    useCloud: false
  }
);

export const ADD_RECORD    = `${PACKAGE_NAME}/history/add-record`;
export const DELETE_RECORD = `${PACKAGE_NAME}/history/delete-record`;
export const EDIT_RECORD   = `${PACKAGE_NAME}/history/edit-record`;

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

export function editHistoryRecord(record, newAmount)
{
  return (dispatch, getState) => {
    var { currencies } = getState();
    dispatch(changeBalance(getInBaseCurrency(
      record.transaction[0].amount - newAmount,
      record.transaction[0].currency,
      currencies
    )));
    var amounts = _.map(record.transaction, (t, i) => {
      if (i == 0) return newAmount;
      return getInCurrency(newAmount, record.transaction[0].currency, t.currency, currencies.exchangeRates);
    });
    dispatch({
      type: EDIT_RECORD,
      date: record.date,
      amounts
    });
  }
}

export function deleteHistoryRecord(record)
{
  return (dispatch, getState) => {
    var {currencies} = getState();
    var transaction = _.find(record.transaction, t => t.spendCurrency == currencies.baseCurrency);
    if (transaction != null) {
      dispatch(changeBalance(transaction.amount));
    } else {
      dispatch(changeBalance(
        getInBaseCurrency(record.transaction[0].amount, record.transaction[0].currency, currencies)
      ));
    }
    dispatch({
      type: DELETE_RECORD,
      date: record.date
    });
  };
}

const reducer = saveable.buildReducer((state, action, save) => {
  switch (action.type) {
    case ADD_RECORD:
      return save(state, {
        list: [...state.list, {
          date: moment().valueOf(),
          transaction: action.transaction
        }]
      });
      break;
    case EDIT_RECORD:
      var newList = _.cloneDeep(state.list);
      var record = _.find(newList, r => r.date == action.date);
      _.forEach(record.transaction, (t, i) => {
        t.amount = action.amounts[i];
      });
      return save(state, {
        list: newList
      });
    case DELETE_RECORD:
      return save(state, {
        list: _.filter(state.list, r => r.date != action.date)
      });
    default:
      return state;
  }
});

export default reducer;
