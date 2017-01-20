/**
 *
 * React-Router configuration
 *
 */

import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Loading from './Loading';

const routes = (
  <Router history={hashHistory}>
    <Route name="home" path="/" component={Loading}>
      
    </Route>
  </Router>
);

export default routes;
