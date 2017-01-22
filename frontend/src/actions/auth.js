import fetch from 'axios';

import { sendMessage } from './message';
import * as ActionTypes from '../constants/actionTypes';

function saveLogin(profile) {
  return ((dispatch, getState) => {
    dispatch({
      type: ActionTypes.LOGIN,
      profile: profile
    });
  });
}

export function logout(callback) {
  return ((dispatch, getState) => {
    dispatch({
      type: ActionTypes.LOGOUT
    });
    window.location = '/';
  });
}

export function login(email, password) {
  return ((dispatch, getState) => {
    fetch.post('/api/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      dispatch(saveLogin(response.data));
      dispatch(sendMessage('Successful', 'success'));
      window.location = '/#/workout';
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch(sendMessage('User Not Found', 'fail'));
        } else if (error.response.status === 500) {
          dispatch(sendMessage('Wrong Password', 'fail'));
        }
      }
    });
  });
}

export function signup(email, password) {
  return ((dispatch, getState) => {
    fetch.post('/api/signup', {
      email: email,
      password: password
    })
    .then(function (response) {
      if (response.status === 200) {
        dispatch(sendMessage('Signup Successfully', 'success'));
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 500) {
        dispatch(sendMessage('Email Already Existed', 'fail'));
      } else {
        dispatch(sendMessage('Failed to signup', 'fail'));
      }
    });
  });
}

