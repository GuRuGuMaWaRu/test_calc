import React from 'react';
import ReactRouter, { Router, Route, hashHistory } from 'react-router';
import Main from '../components/Main';

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>
);

module.exports = routes;
