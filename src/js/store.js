import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import replicate from 'redux-replicate';
import localforage from 'redux-replicate-localforage';
import thunk from 'redux-thunk';

import budget from 'modules/budget';
import history from 'modules/history';
import home from 'modules/home';

const key = 'superCoolStorageUnit';
const reducerKeys = true;
const replicator = localforage;
const replication = replicate({ key, reducerKeys, replicator });
const create = compose(replication)(createStore);

const store = create(combineReducers({
  budget,
  history,
  home
}), {}, applyMiddleware(thunk));

export default store;
