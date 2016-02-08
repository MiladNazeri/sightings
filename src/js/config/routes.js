import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app';
import Splash from '../components/splashView';
import User from '../components/userView';
import Pro from '../components/proView';
import Error from '../components/error';
import auth from "../utils/auth.js";
import api from "../api/api.js";

function requireAuth(nextState, replaceState) {
    if(!auth.loggedIn())
        replaceState({ nextPathname: nextState.location.pathname}, '/')
}

function checkAuth(nextState, replaceState) {
    api.getSession()
    .then( (results) => {
        console.log("session results", results)
        if(!results.data.user){
             delete localStorage.token
        }

        if (auth.loggedIn()) {
            auth.logout();
        }
    })
}

export default (
  <Route path="/" component={App} onEnter={checkAuth} >
    <IndexRoute component={Splash} />
    <Route path="/sightings" component={User} />
    <Route path="/pro" component={Pro} onEnter={requireAuth} />
    <Route path="*" component={Error} />
  </Route>
);