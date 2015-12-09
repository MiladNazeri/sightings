import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }

  }

  render() {
    return (
        <div style={styles.mainContainer}>
            {this.props.children}
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
  }
};

