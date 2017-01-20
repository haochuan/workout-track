/**
 *
 * This is the entry point one reducer
 *
 */
import * as ActionTypes from '../constants/actionTypes';

const initState = {
  isLoading: true
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
        isLoading: false
      };
    default:
      return state;
  }
}
