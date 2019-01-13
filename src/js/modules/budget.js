// balance.js
import moment from 'moment';
import localforage from 'localforage';

const SPEND   = 'budget-haver/budget/spend';
const CHECK   = 'budget-haver/budget/check';

export function spendMoney(amount)
{
  return {
    type: SPEND,
    amount
  };
}

export function checkIncome()
{
  return {
    type: CHECK
  };
}

const initialState = {
  balance: 200,
  lastUpdated: moment().valueOf(),
  budget: 40
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

    default:
      return state;
  }
}
