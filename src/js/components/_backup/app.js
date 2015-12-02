import React from 'react';
import { Router, Route, Link } from 'react-router';
import Dashboard from './dashboard.js';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import auth from "../utils/auth.js"

//material-ui components
import TextField from 'material-ui/lib/text-field';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      count: 0,
      email: '',
      password: '',
      isLoading: false,
      error: false,
      session: {
        id: null,
        user: null
      },
      onChange: false
    };
    this.handleChangeToEmail = this.handleChangeToEmail.bind(this);
    this.handleChangeToPassword = this.handleChangeToPassword.bind(this)
  }

  handleChangeToEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleChangeToPassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  submitLogin(){
    event.preventDefault()

     var email = this.state.email;
     var password = this.state.password;

    auth.login(email,password, (loggedIn) => {
      if(!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
          this.context.history.replaceState(null, location.state.nextPathname)
      } else {
          console.log("replaceState dashboard")
          this.context.history.replaceState(null, '/dashboard')
      }

    })

  }

  submitSignUp(){
    var loginObject = {
      email: this.state.email,
      password: this.state.password
    }
    var email = this.state.email;
    var password = this.state.password;
    auth.signup(email, password, (loggedIn) => {
      if(!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
          this.context.history.replaceState(null, location.state.nextPathname)
      } else {
          console.log("replaceState dashboard")
          this.context.history.replaceState(null, '/dashboard')
      }
    })
  }

  render() {
    return (
        <div style={styles.mainContainer}>
          <p>Go to the <Link to="/dashboard">Dashboard</Link></p>
            <Card style={styles.card}>
              <Tabs>
                <Tab label="Login">
                  <div style={styles.loginFields}>
                    <h3>Email:</h3>
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.handleChangeToEmail}
                    />
                    <br/>
                    <h3>Password</h3>
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChangeToPassword}
                    />
                    <br />
                    <button onClick={this.submitLogin.bind(this)}>Submit</button>
                    {this.state.error && (<p>Bad login information</p>)}
                  </div>
                </Tab>
                <Tab label="Sign Up">
                  <div style={styles.loginFields}>
                    <h3>Email:</h3>
                    <input
                      type="text"
                      value={this.state.email}
                      onChange={this.handleChangeToEmail}
                    />
                    <br/>
                    <h3>Password</h3>
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChangeToPassword}
                    />
                    <br />
                    <button onClick={this.submitSignUp.bind(this)}>Submit</button>
                  </div>
                </Tab>
              </Tabs>
            </Card>
            {this.props.children || "Welcome to the sightings app"}
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
    width: '25%',
  },
  loginFields: {
    marginLeft: 10,
    marginBottom: 30
  }
};

App.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
}

