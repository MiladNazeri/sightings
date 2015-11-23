import React from 'react';
import auth from "../utils/auth.js"
import { Link } from 'react-router';

export default class Default extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: auth.loggedIn()
    };
    this.updateAuth = this.updateAuth.bind(this)
  }
  updateAuth(loggedIn) {
      this.setState({
          loggedIn: loggedIn
      })
  }
  componentWillMount() {
      auth.onChange = this.updateAuth
      auth.login()
  }
  render() {
    return (
      <div>
        <h1 style={styles.center}>Welcome to Sightings</h1>
        <ul>
          <li>
            {this.state.loggedIn ?
              ( <Link to="/logout">Log out</Link> ) :
              ( <Link to="/">Sign in</Link> )
            }
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/dashboard">Dashboard</Link>(authenticated) </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

var styles = {
  center: {
    textAlign: 'center'
  }
}
