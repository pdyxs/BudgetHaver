import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import store from "../js/store/index";
import App from "../js/components/App";
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import store from './store';
import localforage from 'localforage';

localforage.setDriver(localforage.LOCALSTORAGE);

const history = createHashHistory();
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById("app")
);
