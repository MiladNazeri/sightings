var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

import App from '../components/app';
import User from '../components/user';
import Pro from '../components/pro';

module.exports = (
  <Route path="/" component={App}>
    <Route path="/pro" component={Pro} />
    <IndexRoute component={User} />
  </Route>
);