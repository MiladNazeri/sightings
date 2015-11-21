import React from 'react';
import { Router, Route, Link } from 'react-router';
import Dashboard from './dashboard.js';

//material-ui components
import TextField from 'material-ui/lib/text-field';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      username: '',
      password: '',
      isLoading: false,
    };
  }
  handleChangeToEmail(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  }
  handleChangeToPassword(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }
  render() {
    return (
        <div style={styles.mainContainer}>
          <p>Go to the <Link to="/dashboard">Dashboard</Link></p>
            <Card style={styles.card}>
              <Tabs>
                <Tab label="Login">
                  <div style={styles.loginFields}>
                    <TextField
                      //hintText="Username"
                      floatingLabelText="Username"
                      type="text"
                      value={this.state.username}
                      onChange={this.handleChangeToEmail.bind(this)}/>
                    <br/>
                    <TextField
                      floatingLabelText="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChangeToPassword.bind(this)}/>
                  </div>
                </Tab>
                <Tab label="Sign Up">
                  <div>
                    <h2>This is the Sign up Form</h2>
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
