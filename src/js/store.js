import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import budget from 'modules/budget';
import history from 'modules/history';
import navigation from 'modules/navigation';
import currencies from 'modules/currencies';
import analytics from 'modules/analytics';
import achievements from 'modules/achievements';
import interrupts from 'modules/interrupts';
import stars from 'modules/stars';

import { combineReducers, install } from 'redux-loop';
import { initialiseCloud } from 'modules/saveable';

const store = createStore(combineReducers({
  interrupts,
  stars,
  achievements,
  analytics,
  currencies,
  budget,
  history,
  navigation
}), {}, compose(
  install(),
  applyMiddleware(thunk)
));
store.dispatch(initialiseCloud());

export default store;
