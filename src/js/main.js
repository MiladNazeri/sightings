import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Dashboard from './components/dashboard';

// testing the router as the main render
ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="dashboard/:id" component={Dashboard} />
    </Route>
  </Router>
), document.getElementById('main'));

// ReactDOM.render( <App />, document.getElementById('main') );
