import ExchangeRates from './exchange-rates.json';
import Currencies from './currencies.json';
import {initState, saveState} from 'modules/saveable';
import { connect } from 'react-redux';
import _ from 'lodash';

const init = initState('budget');
const save = saveState('budget');

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

const initialState = init({
  baseCurrency: 'AUD',
  spendCurrency: 'AUD',
  favouriteCurrencies: [],
  exchangeRates: ExchangeRates
});

export default function reducer(state = initialState, action = {})
{
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return {
        ...state,
        ...save({baseCurrency: action.currencyCode})
      };
    case SET_SPEND_CURRENCY:
      return {
        ...state,
        ...save({spendCurrency: action.currencyCode})
      };
    case ADD_FAVOURITE_CURRENCY:
      if (_.includes(_.keys(currencies), action.currencyCode) &&
        !_.includes(state.favouriteCurrencies, action.currencyCode)) {
        return {
          ...state,
          ...save({
            favouriteCurrencies: [
              ...state.favouriteCurrencies,
              action.currencyCode
            ]
          })
        };
      }
      return state;
    case REMOVE_FAVOURITE_CURRENCY:
      if (_.includes(state.favouriteCurrencies, action.currencyCode)) {
        return {
          ...state,
          ...save({
            favouriteCurrencies: _.without(state.favouriteCurrencies, action.currencyCode)
          })
        };
      }
      return state;
    default:
      return state;
  }
}
