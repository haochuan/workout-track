/**
 *
 * This is the entry point one reducer
 *
 */
import * as ActionTypes from '../constants/actionTypes';

const initState = {
  content: null,
  messageType: null
};

export default function message(state = initState, action) {
  switch (action.type) {
    case ActionTypes.SEND_MESSAGE:
      return {
        content: action.content,
        messageType: action.messageType
      };
    case ActionTypes.CLEAR_MESSAGE:
      return {
        content: null,
        messageType: null
      };
    default:
      return state;
  }
}
