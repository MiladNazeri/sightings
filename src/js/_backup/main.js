import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, History} from 'react-router';
import { createHistory, useBasename } from 'history'
import auth from "./utils/auth.js"

import App from './components/app';
import Logout from './components/Logout';
import About from './components/About';
import Apptest from './components/apptest.js';
import Dashboard from './components/dashboard';
import Default from './components/default';
import Sightings from './components/sightings';
import AddSighting from './components/AddSighting';

const history = useBasename(createHistory)({
    basename: '/'
})

function requireAuth(nextState, replaceState) {
    if(!auth.loggedIn())
        replaceState({ nextPathname: nextState.location.pathname}, '/')
}


// testing the router as the main render
ReactDOM.render((
  <Router>
    <Route path="/" component={Default}>
      <IndexRoute component={App}/>
      <Route name="logout" path="/logout" component={Logout} />
      <Route name="about" path="/about" component={About} />
      <Route name="sightings" path="/sightings" component={Sightings} onEnter={requireAuth} />
      <Route name="map" path="/map" component={Dashboard} onEnter={requireAuth} />
      <Route name="addSighting" path="/addSighting" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('main'));

// ReactDOM.render( <App />, document.getElementById('main') );
