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
        <div id="title" style={styles.center}>Welcome to Sightings</div>
        <div id = "authButton">
          {this.state.loggedIn ?
            ( <Link to="/logout">Log out</Link> ) :
            ( <Link to="/">Sign in</Link> )
          }
        </div>
        <div id = "mapButton"><Link to="/mapview">mapview</Link></div>
        <div id = "addButton"><Link to="/addSighting"><div><img id="addButtonIcon" src="images/add-icon.png"/></div></Link></div>
        <div id = "sightingsButton"><Link to="/sightings">List of Sightings<img id= "sightingsIcon" src="images/menu-icon.png"/></Link></div>
        {this.props.children}
      </div>
    )
  }
}

var styles = {
  center: {
    textAlign: 'center',
    position: 'absolute',
    height: 26,
    left:0,
    right:0,
    zIndex: 100,
  }
}
