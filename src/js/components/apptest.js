import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Apptest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      username: '',
      password: '',
      isLoading: false,
    };
  }
  render(){
    return (
        <Tabs>
          <Tab label="Item One" >
            (Tab content...)
          </Tab>
          <Tab label="Item Two" >
            (Tab content...)
          </Tab>
          <Tab
            label="Item Three"
            route="home"
            onActive={this._handleTabActive} />
        </Tabs>
    )
  }


}