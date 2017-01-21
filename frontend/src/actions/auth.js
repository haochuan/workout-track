import fetch from 'axios';

import { sendMessage } from './message';
import * as ActionTypes from '../constants/actionTypes';

export function login(email, password) {
  return ((dispatch, getState) => {
    fetch.post('/login', {
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

