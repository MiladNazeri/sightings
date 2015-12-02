import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import auth from "../utils/auth.js";
import AppDispatcher from "../dispatchers/dispatcher.js"
import signinStore from "../stores/signin-store.js"
import SigninAction from "../actions/signin-action.js"

console.log("signinState")

const signinState = () => {
    return signinStore.getState()
}

export default class Signin extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = signinState();

    this._handleChangeToSignInEmail = this._handleChangeToSignInEmail.bind(this);
    this._handleChangeToSignInPassword = this._handleChangeToSignInPassword.bind(this);
    this._handleChangeToSignUpEmail = this._handleChangeToSignUpEmail.bind(this);
    this._handleChangeToSignUpPassword = this._handleChangeToSignUpPassword.bind(this);
    }
    _handleChangeToSignInEmail(e){
        this.setState({
            signInEmail: e.target.value
        });
    }
    _handleChangeToSignInPassword(e){
        this.setState({
            signInPassword: e.target.value
        })
    }
    _handleChangeToSignUpEmail(e){
        this.setState({
            signUpEmail: e.target.value
        });
    }
    _handleChangeToSignUpPassword(e){
        this.setState({
            signUpPassword: e.target.value
        })
    }
    _submitSignIn(){
        SigninAction.submitSignIn( {email: this.state.signInEmail, password: this.state.signInPassword} )
    }

    _submitSignUp(){
        SigninAction.submitSignUp( {email: this.state.signUpEmail, password: this.state.signUpPassword} )
    }
    componentWillMount(){
        signinStore.addChangeListener( this._onChange )
    }
    componentWillUnmount(){
        signinStore.removeChangeListener( this._onChange )
    }
    _onChange(){
        this.setState( signinState )
        if(!this.state.error){

            const { location } = this.props

            if (location.state && location.state.nextPathname) {
                this.context.history.replaceState(null, location.state.nextPathname)
            } else {
                this.context.history.replaceState(null, '/sightings/user/{this.state.userID}')
            }
        }
    }

    render() {

        return (
            <div style={styles.mainContainer}>
                <div>
                <h1>Sign-In</h1>
                <h3>Email:</h3>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChangeToSignInEmail}
                />
                <h3>Password:</h3>
                <br/>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChangeToSignInPassword}
                />
                <br/>
                <button onClick={this._submitSignIn.bind(this)}>Submit</button>
                {this.state.error && (<p>Bad login information</p>)}
                </div>
                <div>
                <h1>Sign-Up</h1>
                <h3>Email:</h3>
                <input
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChangeSignUpEmail}
                />
                <h3>Password:</h3>
                <br/>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChangeToSignUpPassword}
                />
                <br/>
                <button onClick={this._submitSignUp.bind(this)}>Submit</button>
                {this.state.error && (<p>Bad login information</p>)}
                </div>
            </div>
        )
    }

}

var styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '25%'
  },
  loginFields: {
    marginLeft: 10,
    marginBottom: 30
  }
}


Signin.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
}



