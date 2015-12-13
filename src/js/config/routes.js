var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

import App from '../components/app';
import User from '../components/userView';
import Pro from '../components/pro';
import Error from '../components/error';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={User} />
    <Route path="/pro" component={Pro} />
    <Route path="*" component={Error} />
  </Route>
);