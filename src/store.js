/**
 * @flow
 */

import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import auth from './reducers/auth';
import friends from './reducers/friends';
import user from './reducers/user';
import nav from './reducers/nav';
import conversations from './reducers/conversations';
import messages from './reducers/messages';
import error from './reducers/error';

const reducers = combineReducers({
  auth,
  friends,
  user,
  nav,
  conversations,
  messages,
  error,
});

const store = createStore(reducers, applyMiddleware(thunk));
export default store;
