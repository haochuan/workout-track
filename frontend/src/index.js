/**
 *
 * This is the main entry to run react app
 *
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './configureStore';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './containers/App';
import Loading from './containers/Loading';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Workout from './containers/Workout';
import Exercise from './containers/Exercise';
import Stats from './containers/Stats';
import Setting from './containers/Setting';

const store = configureStore();
const rootEl = document.getElementById('root');

function checkAuth(nextState, replace) {
  let { isAuthenticated } = store.getState().status;

  if (isAuthenticated && nextState.location.pathname === '/') {
    replace({pathname: '/workout'});
  } else {
    if (nextState.location.pathname !== '/login' && nextState.location.pathname !== '/signup') {
      if (!isAuthenticated) {
        replace({pathname: '/login'});
      }
    } else {
      if (isAuthenticated) {
        replace({pathname: '/workout'});
      }
    }
  }
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route component={Loading}>
          <Route path="/" onEnter={checkAuth} component={App}>
            <Route path="/workout" onEnter={checkAuth} component={Workout} />
            <Route path="/exercise" onEnter={checkAuth} component={Exercise} />
            <Route path="/stats" onEnter={checkAuth} component={Stats} />
            <Route path="/setting" onEnter={checkAuth} component={Setting} />
          </Route>
          <Route path="/login" onEnter={checkAuth} component={Login} />
          <Route path="/signup" onEnter={checkAuth} component={Signup} />
        </Route>
      </Router>
    </Provider>,
    rootEl
  );
}
render();
