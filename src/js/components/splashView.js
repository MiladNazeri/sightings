import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import axios from 'axios';
import ReactSelect from 'react-select';
import helper from '../utils/helper.js'
var $ = require('jquery-latest');

export default class Map extends React.Component {
    render() {
            return (
                <div>
                    <div id="splash">
                        <div id="splash-background"></div>
                        <div id="splash-overlay"></div>
                        <img id="splash-logo" src={'images/logo.png'} />
                        <button id="link-to-sightings"><a href="/sightings">Submit Whale Sightings</a></button>
                        <button id="link-to-pro"><a href="/pro">For Whale Experts</a></button>
                    </div>
                </div>
            )
    }

}