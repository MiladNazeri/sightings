import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Router, Route, Link, IndexRoute } from 'react-router';
import Dashboard from './components/dashboard';
import Default from './components/default'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// testing the router as the main render
ReactDOM.render((
  <Router>
    <Route path="/" component={Default}>
      <IndexRoute component={App}/>
      <Route path="/dashboard" component={Dashboard} />
    </Route>
  </Router>
), document.getElementById('main'));

// ReactDOM.render( <App />, document.getElementById('main') );
