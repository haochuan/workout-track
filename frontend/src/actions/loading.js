import * as ActionTypes from '../constants/actionTypes';

function loadingStart() {
  return ((dispatch, getState) => {
    dispatch({
      type: ActionTypes.LOADING_START
    });
  });
}

function loadingEnd() {
  return ((dispatch, getState) => {
    dispatch({
      type: ActionTypes.LOADING_END
    });
  });
}

export function loading() {
  return ((dispatch, getState) => {
    const isLoading = getState().status.isLoading;
    if (isLoading !== 'loaded') {
      dispatch(loadingStart());
      setTimeout(() => {
        dispatch(loadingEnd());
      }, 3000);
    }
  });
}

