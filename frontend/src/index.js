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
import Login from './containers/Login';
import Home from './containers/Home';

const store = configureStore();
const rootEl = document.getElementById('root');

function checkAuth(nextState, replace) {
  let { isAuthenticated } = store.getState().status;

  if (nextState.location.pathname === '/') {
    if (!isAuthenticated) {
      replace({pathname: '/login'});
    }
  }

  if (nextState.location.pathname === '/login' || nextState.location.pathname === '/signup' ) {
    if (isAuthenticated) {
      replace({pathname: '/'});
    }
  }
}

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route component={App}>
          <Route path="/" onEnter={checkAuth} component={Home} />
          <Route path="/login" onEnter={checkAuth} component={Login} />
        </Route>
      </Router>
    </Provider>,
    rootEl
  );
}
render();
