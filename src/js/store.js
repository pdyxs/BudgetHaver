import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import budget from 'modules/budget';
import history from 'modules/history';
import home from 'modules/home';

const store = createStore(combineReducers({
  budget,
  history,
  home
}), {}, applyMiddleware(thunk));

export default store;
