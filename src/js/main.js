import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, History} from 'react-router';
import auth from "./utils/auth.js"

import App from './components/app';
import Logout from './components/Logout';
import Default from './components/default';
import Sightings from './components/sightings';
import MapView from './components/MapView';
import AddSighting from './components/addsighting';

function requireAuth(nextState, replaceState) {
    if(!auth.loggedIn())
        replaceState({ nextPathname: nextState.location.pathname}, '/')
}

ReactDOM.render((
  <Router>
    <Route path="/" component={Default}>
      <IndexRoute component={App}/>
      <Route name="logout" path="/logout" component={Logout} />
      <Route name="sightings" path="/sightings" component={Sightings} onEnter={requireAuth} />
      <Route name="sightings" path="/sightings/user/:id" component={Sightings} onEnter={requireAuth} />
      <Route name="sightings" path="/sightings/animal/:id" component={Sightings} onEnter={requireAuth} />
      <Route name="mapview" path="/mapview" component={MapView} onEnter={requireAuth} />
      <Route name="addSighting" path="/addSighting" component={AddSighting} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('main'));
