import AnalyticsLevels, {
  ANALYTICS_NONE,
  ANALYTICS_NAVIGATION,
  ANALYTICS_CURRENCY,
  ANALYTICS_BUDGET_ACTIONS,
  ANALYTICS_AMOUNTS,
  isAllowed
} from './levels';

import {
  SET_HOME,
  OPEN_STARS, CLOSE_STARS,
  OPEN_HELP, CLOSE_HELP,
  START_SESSION, END_SESSION
} from 'modules/navigation';
import {SPEND, OVERRIDE_BUDGET, OVERRIDE_BALANCE} from 'modules/budget';
import {SET_BASE_CURRENCY, ADD_FAVOURITE_CURRENCY, REMOVE_FAVOURITE_CURRENCY} from 'modules/currencies';
import {SET_LEVEL} from 'modules/analytics';

const AnalyticsEvents = [
  {
    actions: [SET_LEVEL],
    type: ANALYTICS_NONE,
    collection: 'analytics-level',
    data: (action, state) => ({
      level: action.level
    })
  },
  {
    actions: [SET_HOME],
    type: ANALYTICS_NAVIGATION,
    collection: 'navigation',
    data: (action, state) => ({
      page: action.page
    })
  },
  {
    actions: [START_SESSION, END_SESSION],
    type: ANALYTICS_NAVIGATION,
    collection: 'sessions',
    data: (action, state) => ({})
  },
  {
    actions: [OPEN_STARS, CLOSE_STARS, OPEN_HELP, CLOSE_HELP],
    type: ANALYTICS_NAVIGATION,
    collection: 'navigation',
    data: (action, state) => ({
      page: state.navigation.home
    })
  },
  {
    actions: [SET_BASE_CURRENCY],
    type: ANALYTICS_CURRENCY,
    collection: 'base-currency',
    data: (action, state) => ({
      currency: action.currencyCode
    })
  },
  {
    actions: [ADD_FAVOURITE_CURRENCY, REMOVE_FAVOURITE_CURRENCY],
    type: ANALYTICS_CURRENCY,
    collection: 'favouriteCurrencies',
    data: (action, state) => ({
      currencyChanged: action.currencyCode,
      currencies: state.currencies.favouriteCurrencies
    })
  },
  {
    actions: [SPEND],
    type: ANALYTICS_BUDGET_ACTIONS,
    collection: 'spend',
    data: (action, state) => {
      if (!isAllowed(ANALYTICS_AMOUNTS, state.analytics.trackingLevel)) {
        return {};
      }
      return {
        amount: action.amount,
        currency: state.currencies.spendCurrency,
        balance: state.budget.balance,
        balanceCurrency: state.currencies.baseCurrency
      };
    }
  },
  {
    actions: [OVERRIDE_BUDGET],
    type: ANALYTICS_BUDGET_ACTIONS,
    collection: 'daily-budget',
    data: (action, state) => {
      if (!isAllowed(ANALYTICS_AMOUNTS, state.analytics.trackingLevel)) {
        return {};
      }
      return {
        budget: action.amount,
        currency: state.currencies.baseCurrency
      };
    }
  },
  {
    actions: [OVERRIDE_BALANCE],
    type: ANALYTICS_BUDGET_ACTIONS,
    collection: 'balance',
    data: (action, state) => {
      if (!isAllowed(ANALYTICS_AMOUNTS, state.analytics.trackingLevel)) {
        return {};
      }
      return {
        balance: action.amount,
        currency: state.currencies.baseCurrency
      };
    }
  }
];

export default AnalyticsEvents;
