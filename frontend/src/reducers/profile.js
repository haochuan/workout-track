/**
 *
 * This is the entry point one reducer
 *
 */
import * as ActionTypes from '../constants/actionTypes';

const initState = {};

export default function status(state = initState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return action.profile
    default:
      return state;
  }
}
