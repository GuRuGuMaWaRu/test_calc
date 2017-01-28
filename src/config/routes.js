import React from 'react';
import ReactRouter, { Router, Route, hashHistory } from 'react-router';
import Calculator from '../components/Calculator';

var routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Calculator} />
  </Router>
);

module.exports = routes;
