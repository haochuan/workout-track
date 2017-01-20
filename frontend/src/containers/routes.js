/**
 *
 * React-Router configuration
 *
 */

import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Loading from './Loading';
import App from './App';

const routes = (
  <Router history={hashHistory}>
    <Route component={Loading}>
      <Route name="app" path="/" component={App} />
      <Route name="app" path="/login" component={App} />


    </Route>
  </Router>
);

export default routes;
