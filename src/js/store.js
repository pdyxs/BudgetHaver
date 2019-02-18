import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import budget from 'modules/budget';
import history from 'modules/history';
import home from 'modules/home';
import currencies from 'modules/currencies';
import recurrences from 'modules/recurrences';

const store = createStore(combineReducers({
  currencies,
  budget,
  history,
  recurrences,
  home
}), {}, applyMiddleware(thunk));

export default store;
