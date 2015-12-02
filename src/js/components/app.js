import React from 'react';
import auth from "../utils/auth.js";
import { Link } from 'react-router';

function getAppState() {
    // loggedIn: LoginStore.loggedIn(),
    // email:,
    // userID:,
    // allSightings:,
    // userSightings:,
    // animalsForSelect:,
}

export default class App extends React.Component {

    constructor(props){
    super(props);
    this.state = getAppState();
    }


    render() {
    console.log(this.props)
        return (
            <div>
                <h1 style={styles.center}>Welcome to Sightings</h1>
                <ul>
                    <li><Link to="/sightings">Sightings</Link></li>
                    <li><Link to="/map">Map</Link></li>
                    <li><Link to="/addSighting">Add Sighting</Link></li>
                </ul>

                <div>
                {this.props.children}
                </div>

            </div>
        )
    }
}

var styles = {
  center: {
    textAlign: 'center'
  }
}



    //     this.state = {
    //         loggedIn: auth.loggedIn()
    //     };
    //     this._updateAuth = this._updateAuth.bind(this)
    // }
    // _updateAuth(loggedIn) {
    //     this.setState({
    //         loggedIn: loggedIn
    //     })
    // }
    // componentWillMount() {
    //     auth.onChange = this._updateAuth;
    //     auth.login();
    // }