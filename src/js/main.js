import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, History, Link } from 'react-router';
import auth from "./utils/auth.js";

import App from './components/App';
import Signin from './components/Signin.js';
import Sightings from './components/Sightings.js';
import MapView from './components/MapView.js';
import AddSighting from './components/AddSighting.js';

function requireAuth(nextState, replaceState) {
    if(!auth.loggedIn())
        replaceState({ nextPathname: nextState.location.pathname}, '/signin')
}

ReactDOM.render((
      <Router>
        <Route name='app' path="/" component={App}>
          <Route name="signin" path='/signin' component={Signin}/>
          <Route name="userSightings" path="/sightings/user/:id" component={Sightings} onEnter={requireAuth} />
          <Route name="animalSightings" path="/sightings/animal/:animalId" component={Sightings} onEnter={requireAuth} />
          <Route name="mapView" path="/mapView" component={MapView} onEnter={requireAuth} />
          <Route name="addSighting" path="/addSighting" component={AddSighting} onEnter={requireAuth} />
        </Route>
      </Router>
), document.getElementById('main'))
