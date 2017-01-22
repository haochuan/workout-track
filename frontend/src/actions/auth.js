import fetch from 'axios';

import { sendMessage } from './message';
import * as ActionTypes from '../constants/actionTypes';

export function login(email, password) {
  return ((dispatch, getState) => {
    fetch.post('/api/login', {
      email: email,
      password: password
    })
    .then(function (response) {
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status === 404) {
          dispatch(sendMessage('User Not Found', 'error'));
        } else if (error.response.status === 500) {
          dispatch(sendMessage('Wrong Password', 'error'));
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
        dispatch(sendMessage('Email Already Existed', 'error'));
      } else {
        dispatch(sendMessage('Failed to signup', 'error'));
      }
    });
  });
}

