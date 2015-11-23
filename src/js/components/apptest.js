import React from 'react';
import { Router, Route, Link } from 'react-router';
import Dashboard from './dashboard.js';
import ReactDOM from 'react-dom';

//material-ui components
import TextField from 'material-ui/lib/text-field';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
// import RaisedButton from 'material-ui/lib/raised-button';
import mui from 'material-ui';

var RaisedButton = mui.RaisedButton;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      email: '',
      password: '',
      isLoading: false,
      inputContent: 'startValue'
    };
    this.changeContent = this.changeContent.bind(this)
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
  submit(){
    var loginObject = {
      username: this.state.email,
      password: this.state.password
    }
    console.log(loginObject)
    console.log("submit button pressed")
  }
  sendContent(e) {
      console.log('sending input' + ReactDOM.findDOMNode(this.refs.someref).value)
  }

  changeContent(e) {
      this.setState({inputContent: e.target.value})
  }
  render() {
    return (
        <div style={styles.mainContainer}>
          <p>Go to the <Link to="/dashboard">Dashboard</Link></p>
            <Card style={styles.card}>
              <Tabs>
                <Tab label="Login">
                  <div style={styles.loginFields}>
                    <div>
                      <h4>The input form is here:</h4>
                      Title:
                      <input
                          type="text"
                          ref="someref"
                          value={this.state.inputContent}
                          onChange={this.changeContent}
                      />

                      <button onClick={this.sendContent.bind(this)}>Submit</button>
                      {this.state.inputContent}
                    </div>
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
