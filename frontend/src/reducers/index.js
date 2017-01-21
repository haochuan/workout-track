/**
 *
 * This is the entry point for all reducers
 *
 */

import { combineReducers } from 'redux';
import status from './status';
import message from './message';


const reducer = combineReducers({
  status,
  message
});

export default reducer;

