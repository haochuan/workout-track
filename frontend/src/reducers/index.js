/**
 *
 * This is the entry point for all reducers
 *
 */

import { combineReducers } from 'redux';
import status from './status';


const reducer = combineReducers({
  status,
});

export default reducer;

