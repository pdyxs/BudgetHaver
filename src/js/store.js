import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import budget from 'modules/budget';
import history from 'modules/history';
import navigation from 'modules/navigation';
import currencies from 'modules/currencies';
import analytics from 'modules/analytics';
import achievements from 'modules/achievements';
import interrupts from 'modules/interrupts';

import { combineReducers, install } from 'redux-loop';

const store = createStore(combineReducers({
  interrupts,
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

export default store;
