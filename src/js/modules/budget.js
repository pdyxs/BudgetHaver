// balance.js
import moment from 'moment';
import { addHistoryRecord } from './history';
import {initState, saveState} from 'modules/saveable';
import { getInBaseCurrency } from 'modules/currencies';

const init = initState('budget');
const save = saveState('budget');

export const SPEND             = `${PACKAGE_NAME}/budget/spend`;
export const ADD_BUDGET        = `${PACKAGE_NAME}/budget/add-budget`
export const CHECKED           = `${PACKAGE_NAME}/budget/checked`;
export const OVERRIDE_BUDGET   = `${PACKAGE_NAME}/budget/override-budget`;
export const OVERRIDE_BALANCE  = `${PACKAGE_NAME}/budget/override-balance`;

export const CHANGE_BALANCE    = `${PACKAGE_NAME}/budget/change-balance`;

export function spendMoney(amount)
{
  return (dispatch, getState) => {
    dispatch(addHistoryRecord(amount));
    var {currencies} = getState();
    dispatch({
      type: SPEND,
      amount: getInBaseCurrency(amount, currencies.spendCurrency, currencies)
    });
  }
}

export function checkIncome()
{
  return (dispatch, getState) => {
    var {budget} = getState();
    if (budget.lastUpdated == null) {
      var lastUpdated = moment().valueOf();
      dispatch({type: CHECKED});
      return;
    }
    var lastDayUpdated = moment(budget.lastUpdated).startOf("day");
    var daysSince = moment().startOf("day").diff(lastDayUpdated, 'days');
    if (daysSince == 0) {
      dispatch({type: CHECKED});
      return;
    }
    dispatch({
      type: ADD_BUDGET,
      days: daysSince
    });
  }
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

export function changeBalance(amount)
{
  return {
    type: CHANGE_BALANCE,
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
  balance: 0,
  lastUpdated: moment().valueOf(),
  budget: 0
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SPEND:
      var newBalance = state.balance - action.amount;
      return {
        ...state,
        ...save({balance: newBalance})
      };

    case CHECKED:
      var lastUpdated = moment().valueOf();
      return {
        ...state,
        ...save({lastUpdated})
      }

    case ADD_BUDGET:
      var newBalance = state.balance + state.budget * action.days
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

    case CHANGE_BALANCE:
      return {
        ...state,
        ...save({balance: state.balance + action.amount})
      };

    default:
      return state;
  }
}
