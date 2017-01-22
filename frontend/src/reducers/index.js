/**
 *
 * This is the entry point for all reducers
 *
 */

import { combineReducers } from 'redux';
import status from './status';
import message from './message';
import profile from './profile';


const reducer = combineReducers({
  status,
  message,
  profile
});

export default reducer;

