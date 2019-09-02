// balance.js
import moment from 'moment';
import { addHistoryRecord } from './history';
import Saveable from 'modules/saveable';
import { getInBaseCurrency } from 'modules/currencies';

const saveable = new Saveable(
  'budget',
  {
    initialSaveable: {
      balance: 0,
      lastUpdated: moment().valueOf(),
      budget: 0
    },
    useCloud: true
  }
);

export const SPEND             = `${PACKAGE_NAME}/budget/spend`;
export const ADD_BUDGET        = `${PACKAGE_NAME}/budget/add-budget`;
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
    dispatch({ type: CHECKED });
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

const reducer = saveable.buildReducer(
  (state, action, save) => {
    switch (action.type) {
      case SPEND:
        var newBalance = state.balance - action.amount;
        return save(state, {
          balance: newBalance
        });

      case CHECKED:
        var lastUpdated = moment().valueOf();
        return save(state, {lastUpdated}, false);

      case ADD_BUDGET:
        var newBalance = state.balance + state.budget * action.days
        var lastUpdated = moment().valueOf();
        return save(state, {
          balance: newBalance,
          lastUpdated
        });

      case OVERRIDE_BUDGET:
        return save(state, {budget: action.amount});

      case OVERRIDE_BALANCE:
        return save(state, {balance: action.amount});

      case CHANGE_BALANCE:
        return save(state, {
          balance: state.balance + action.amount
        });

      default:
        return state;
    }
  }
);

export default reducer;
