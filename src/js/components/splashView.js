import React, { Component, PropTypes } from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import axios from 'axios';
import ReactSelect from 'react-select';
import helper from '../utils/helper.js'
var $ = require('jquery');
import auth from "../utils/auth.js";
import { createUser, loginUser } from '../actions/app-actions.js';
import SignUp from './signup.js'
import LogIn from  './logIn.js'
import { connect } from 'react-redux';

class Splash extends React.Component {
    constructor(props){
       super(props);
       this.state = {
        whaleExpertClick : false,
        error: false,
       }
       this.linkToProHandle = this.linkToProHandle.bind(this);
       this.linkToSightingsHandle = this.linkToSightingsHandle.bind(this);
    }
    static contextTypes = {
        location: PropTypes.object,
        history: PropTypes.object
    };
    linkToProHandle(e){
        this.setState({whaleExpertClick: true})
    }
    linkToSightingsHandle(e){
      console.log(this.context)
        this.props.history.pushState(null, "/sightings");
    }
    componentDidMount(){
        if(auth.loggedIn())
        this.props.history.pushState(null, '/pro')
    }
    render() {
        let spashID = (this.state.whaleExpertClick) ? "splash-logo2" : "splash-logo1";
            return (
                <div>
                    <div id="splash">
                        <div id="splash-background"></div>
                        <div id="splash-overlay"></div>
                        <img className={spashID} src={'images/logo.png'} />
                        {!this.state.whaleExpertClick &&
                        <div>
                            <button id="link-to-sightings" onClick={this.linkToSightingsHandle}>For Whale Sightings</button>
                            <button id="link-to-pro" onClick={this.linkToProHandle}>For Whale Experts</button>
                        </div>}
                        <SignUp formkey={"signUp"} whaleExpertClick={this.state.whaleExpertClick} />
                        <LogIn formkey={"login"} whaleExpertClick={this.state.whaleExpertClick} />
                    </div>
                </div>
            )
    }
}

function mapStateToProps(state) {
    return { signIn: state.error };
}

export default connect(mapStateToProps)(Splash);