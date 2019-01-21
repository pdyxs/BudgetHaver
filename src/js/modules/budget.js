// balance.js
import moment from 'moment';
import localforage from 'localforage';
import { addHistoryRecord } from './history';

const SPEND             = 'budget-haver/budget/spend';
const CHECK             = 'budget-haver/budget/check';
const OVERRIDE_BUDGET   = 'budget-haver/budget/override-budget';
const OVERRIDE_BALANCE  = 'budget-haver/budget/override-balance';

export function spendMoney(amount)
{
  return (dispatch) => {
    dispatch(addHistoryRecord(amount));
    dispatch({
      type: SPEND,
      amount
    });
  }
}

export function checkIncome()
{
  return {
    type: CHECK
  };
}

export function overrideBalance(amount)
{
  return {
    type: OVERRIDE_BALANCE,
    amount
  };
}

export function overrideBudget(amount)
{
  return {
    type: OVERRIDE_BUDGET,
    amount
  };
}

const initialState = {
  balance: null,
  lastUpdated: moment().valueOf(),
  budget: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case SPEND:
      var newBalance = state.balance - action.amount;
      localforage.setItem('balance', newBalance);
      return {
        ...state,
        balance: newBalance
      };

    case CHECK:
      var lastDayUpdated = moment(state.lastUpdated).startOf("day");
      var daysSince = moment().startOf("day").diff(lastDayUpdated, 'days');
      var newBalance = state.balance;
      if (daysSince != 0) {
        newBalance = newBalance + state.budget * daysSince;
        // localforage.setItem('balance', newBalance);
      }
      var lastUpdated = moment().valueOf();
      // localforage.setItem('lastUpdated', lastUpdated);
      return {
        ...state,
        balance: newBalance,
        lastUpdated
      };

    case OVERRIDE_BUDGET:
      return {
        ...state,
        budget: action.amount
      };

    case OVERRIDE_BALANCE:
      return {
        ...state,
        balance: action.amount
      };

    default:
      return state;
  }
}
