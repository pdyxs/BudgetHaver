import {combineReducers, createStore} from 'redux';
import budget from './modules/budget';

const store = createStore(combineReducers({
  budget
}));

export default store;
