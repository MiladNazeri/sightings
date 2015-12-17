import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import axios from 'axios';
import ReactSelect from 'react-select';
import helper from '../utils/helper.js'
var $ = require('jquery-latest');
import auth from "../utils/auth.js";

export default class Splash extends React.Component {
    constructor(props){
       super(props);
       this.state = {
        whaleExpertClick : false,
        error: false,
        logInEmail: "",
        logInPassword: "",
        signUpUserName: "",
        signUpName: "",
        signUpEmail: "",
        signUpOrganization: "",
        signUpShortBio: "",
        signUpPassword: ""
       }
       this.linkToProHandle = this.linkToProHandle.bind(this);
       this.handleChangeTologInEmail = this.handleChangeTologInEmail.bind(this);
       this.handleChangeTologInPassword = this.handleChangeTologInPassword.bind(this);
       this.handleChangeTosignUpUserName = this.handleChangeTosignUpUserName.bind(this);
       this.handleChangeTosignUpName = this.handleChangeTosignUpName.bind(this);
       this.handleChangeTosignUpEmail = this.handleChangeTosignUpEmail.bind(this);
       this.handleChangeTosignUpOrganization = this.handleChangeTosignUpOrganization.bind(this);
       this.handleChangeTosignUpShortBio = this.handleChangeTosignUpShortBio.bind(this);
       this.handleChangeTosignUpPassword = this.handleChangeTosignUpPassword.bind(this);
    }
    linkToProHandle(e){
        this.setState({whaleExpertClick: true})
    }
      submitSignUp(){
        var signUpObject = {
          email: this.state.signUpEmail,
          password: this.state.signUpPassword,
          name: this.state.signUpName,
          organization: this.state.signUpOrganization,
          shortBio: this.state.signUpShortBio,
          userName: this.state.signUpUserName
        }
        api.createUser(signUpObject)
        .then(res => {
          console.log(res)
          this.context.history.pushState(null, '/pro')
          } )
        .catch(error => console.log("error ", error))
    }
    submitLogin(){
      event.preventDefault()

       var email = this.state.logInEmail;
       var password = this.state.logInPassword;

      auth.login(email,password, (loggedIn) => {
        if(!loggedIn)
          return this.setState({ error: true })

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
            this.context.history.replaceState(null, location.state.nextPathname)
        } else {
            this.context.history.replaceState(null, '/pro')
        }

      })

    }
    componentDidMount(){
        if(auth.loggedIn())
        this.context.history.replaceState(null, '/pro')
    }
    handleChangeTologInEmail(event) {
       this.setState({
         logInEmail: event.target.value
       });
     }
     handleChangeTologInPassword(event) {
       this.setState({
         logInPassword: event.target.value
       });
     }
     handleChangeTosignUpUserName(event) {
       this.setState({
         signUpUserName: event.target.value
       });
     }
     handleChangeTosignUpName(event) {
       this.setState({
         signUpName: event.target.value
       });
     }
     handleChangeTosignUpEmail(event) {
       this.setState({
         signUpEmail: event.target.value
       });
     }
     handleChangeTosignUpOrganization(event) {
       this.setState({
         signUpOrganization: event.target.value
       });
     }
     handleChangeTosignUpShortBio(event) {
       this.setState({
         signUpShortBio: event.target.value
       });
     }
     handleChangeTosignUpPassword(event) {
       this.setState({
         signUpPassword: event.target.value
       });
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
                            <button id="link-to-sightings"><a href="/sightings">Submit Whale Sightings</a></button>
                            <button id="link-to-pro" onClick={this.linkToProHandle}>For Whale Experts</button>
                        </div>}
                        {this.state.whaleExpertClick &&
                            <div>
                                <div className="signUp">
                                    <h1>Sign Up</h1>
                                    <h3>User Name:</h3>
                                    <input
                                      type="text"
                                      value={this.state.signUpUserName}
                                      onChange={this.handleChangeTosignUpUserName} />
                                    <br/>
                                    <h3>Name:</h3>
                                    <input
                                      type="text"
                                      value={this.state.signUpName}
                                      onChange={this.handleChangeTosignUpName} />
                                    <br/>
                                    <h3>Email:</h3>
                                    <input
                                      type="email"
                                      value={this.state.signUpEmail}
                                      onChange={this.handleChangeTosignUpEmail} />
                                    <br/>
                                    <h3>Organization:</h3>
                                    <input
                                      type="text"
                                      value={this.state.signUpOrganization}
                                      onChange={this.handleChangeTosignUpOrganization} />
                                    <br/>
                                    <h3>Short Bio:</h3>
                                    <textarea
                                      value={this.state.signUpShortBio}
                                      onChange={this.handleChangeTosignUpShortBio} />
                                    <br/>
                                    <h3>Password:</h3>
                                    <input
                                      type="password"
                                      value={this.state.signUpPassword}
                                      onChange={this.handleChangeTosignUpPassword} />
                                    <br />
                                    <button onClick={this.submitSignUp.bind(this)}>Submit</button>

                                  </div>
                                <div className="logIn">
                                    <h1>Log In</h1>
                                    <h3>Email:</h3>
                                        <input
                                          type="text"
                                          value={this.state.logInEmail}
                                          onChange={this.handleChangeTologInUserName} />
                                        <br/>
                                        <h3>Password</h3>
                                        <input
                                          type="password"
                                          value={this.state.logInPassword}
                                          onChange={this.handleChangeTologInPassword} />
                                        <br />
                                        <button onClick={this.submitLogin.bind(this)}>Submit</button>
                                        {this.state.error && (<p>Bad login information</p>)}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            )
    }
}


Splash.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
}
