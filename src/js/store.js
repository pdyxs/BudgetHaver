import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import budget from 'modules/budget';
import history from 'modules/history';
import home from 'modules/home';
import currencies from 'modules/currencies';
import analytics from 'modules/analytics';

const store = createStore(combineReducers({
  analytics,
  currencies,
  budget,
  history,
  home
}), {}, applyMiddleware(thunk));

export default store;
