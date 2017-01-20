/**
 *
 * Root Container of the react app
 *
 */

import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';
import style from './style.css';

import 'antd-mobile/dist/antd-mobile.min.css';

const Root = ({ store }) => (
  <Provider store={store}>
    { routes }
  </Provider>
);

export default Root;
