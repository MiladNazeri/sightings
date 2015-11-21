// import React from 'react';
// import AppActions from '../actions/app-actions';
// import Template from './app-template';
// import { Router, Route, IndexRoute } from 'react-router';
//
// export default () => {
//     return (
//         <Router>
//             <Route path="/" component={Template}>
//                 <IndexRoute component={ null } />
//                 <Route path="" component={ null } />
//                 <Route path="item/:item" component={ null } />
//             </Route>
//         </Router>
//     );
// }

import React from 'react';
import { Router, Route, Link } from 'react-router';

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
          <h1>Welcome to Sightings</h1>
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
    marginLeft: 10
  }
};
