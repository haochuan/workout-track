/**
 *
 * This is the entry point one reducer
 *
 */
import * as ActionTypes from '../constants/actionTypes';

const initState = {
  isLoading: false,
  isAuthenticated: true
};

export default function status(state = initState, action) {
  switch (action.type) {
    case ActionTypes.LOADING_START:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.LOADING_END:
      return {
        ...state,
        isLoading: 'loaded'
      };
    default:
      return state;
  }
}
