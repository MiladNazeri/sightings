import React from 'react';
import AppActions from '../actions/app-actions';
import Template from './app-template';
import { Router, Route, IndexRoute } from 'react-router';

export default () => {
    return (
        <Router>
            <Route path="/" component={Template}>
                <IndexRoute component={ null } />
                <Route path="" component={ null } />
                <Route path="item/:item" component={ null } />
            </Route>
        </Router>
    );
}
