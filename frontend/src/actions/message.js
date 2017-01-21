import * as ActionTypes from '../constants/actionTypes';

export function sendMessage(content, messageType, timeout = 3) {
  return ((dispatch, getState) => {
    dispatch(send(content, messageType));
    setTimeout(() => {
      dispatch(clear());
    }, timeout * 1000);
  });
}

function send(content, messageType) {
  return ((dispatch, getState) => {
    dispatch({
      type: ActionTypes.SEND_MESSAGE,
      content: content,
      messageType: messageType

    });
  });
}

function clear() {
  return ((dispatch, getState) => {
    dispatch({
      type: ActionTypes.CLEAR_MESSAGE
    });
  });
}

