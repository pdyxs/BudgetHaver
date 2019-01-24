// balance.js
import moment from 'moment';
import { addHistoryRecord } from './history';
import {initState, saveState} from 'modules/saveable';

const init = initState('budget');
const save = saveState('budget');

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

const initialState = init({
  balance: 200,
  lastUpdated: moment().valueOf(),
  budget: 50
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SPEND:
      var newBalance = state.balance - action.amount;
      return {
        ...state,
        ...save({balance: newBalance})
      };

    case CHECK:
      if (state.lastUpdated == null) {
        var lastUpdated = moment().valueOf();
        return {
          ...state,
          ...save({lastUpdated})
        }
      }
      var lastDayUpdated = moment(state.lastUpdated).startOf("day");
      var daysSince = moment().startOf("day").diff(lastDayUpdated, 'days');
      var newBalance = state.balance;
      if (daysSince != 0) {
        newBalance = newBalance + state.budget * daysSince;
      }
      var lastUpdated = moment().valueOf();
      return {
        ...state,
        ...save({
          balance: newBalance,
          lastUpdated
        })
      };

    case OVERRIDE_BUDGET:
      return {
        ...state,
        ...save({budget: action.amount})
      };

    case OVERRIDE_BALANCE:
      return {
        ...state,
        ...save({balance: action.amount})
      };

    default:
      return state;
  }
}
