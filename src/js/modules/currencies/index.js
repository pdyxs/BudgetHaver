import ExchangeRates from './exchange-rates.json';
import Currencies from './currencies.json';
import Saveable, {LocalStorageService} from 'modules/saveable';
import { connect } from 'react-redux';
import _ from 'lodash';

const saveable = new Saveable(
  'currencies',
  [{
    defaults: {
      baseCurrency: 'AUD',
      spendCurrency: 'AUD',
      favouriteCurrencies: []
    },
    sources: [LocalStorageService]
  },
  {
    defaults: {exchangeRates: ExchangeRates}
  }]
);

export const SET_BASE_CURRENCY = `${PACKAGE_NAME}/currencies/set-base-currency`;
export const SET_SPEND_CURRENCY = `${PACKAGE_NAME}/currencies/set-spend-currency`;
export const ADD_FAVOURITE_CURRENCY = `${PACKAGE_NAME}/currencies/add-favourite-currency`;
export const REMOVE_FAVOURITE_CURRENCY = `${PACKAGE_NAME}/currencies/remove-favourite-currency`;

export const currencies = Currencies;

export function getCurrencyFormatter(currency, useGrouping = true)
{
  var formatter = new Intl.NumberFormat('en-AU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: currencies[currency].decimal_digits,
    useGrouping
  });
  return (number, includeSymbol = true) =>
    (includeSymbol ? currencies[currency].symbol_native : '') +
    formatter.format(number);
}

export function setBaseCurrency(currencyCode)
{
  return {
    type: SET_BASE_CURRENCY,
    currencyCode
  };
}

export function setSpendCurrency(currencyCode)
{
  return {
    type: SET_SPEND_CURRENCY,
    currencyCode
  };
}

export function addFavouriteCurrency(currencyCode)
{
  return {
    type: ADD_FAVOURITE_CURRENCY,
    currencyCode
  };
};

export function removeFavouriteCurrency(currencyCode)
{
  return {
    type: REMOVE_FAVOURITE_CURRENCY,
    currencyCode
  };
};

export function getInCurrency(amount, currency, targetCurrency, exchangeRates)
{
  return amount * exchangeRates.rates[targetCurrency] / exchangeRates.rates[currency];
}

export function getInBaseCurrency(amount, currency, {baseCurrency, exchangeRates})
{
  return getInCurrency(amount, currency, baseCurrency, exchangeRates);
}

const reducer = saveable.buildReducer(
  (state, action, save) => {
    switch (action.type) {
      case SET_BASE_CURRENCY:
        return save(state,
          {
            baseCurrency: action.currencyCode,
            spendCurrency: action.currencyCode
          }
        );
      case SET_SPEND_CURRENCY:
        return save(state, {spendCurrency: action.currencyCode});
      case ADD_FAVOURITE_CURRENCY:
        if (_.includes(_.keys(currencies), action.currencyCode) &&
          !_.includes(state.favouriteCurrencies, action.currencyCode)) {
          return save(state, {
            favouriteCurrencies: [
              ...state.favouriteCurrencies,
              action.currencyCode
            ]
          });
        }
        return state;
      case REMOVE_FAVOURITE_CURRENCY:
        if (_.includes(state.favouriteCurrencies, action.currencyCode)) {
          var spendCurrency = state.spendCurrency == action.currencyCode ? state.baseCurrency : state.spendCurrency;
          return save(state, {
            spendCurrency,
            favouriteCurrencies: _.without(state.favouriteCurrencies, action.currencyCode)
          });
        }
        return state;
      default:
        return state;
    }
  }
);

export default reducer;
