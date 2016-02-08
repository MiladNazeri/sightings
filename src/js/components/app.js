import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import { connect } from 'react-redux';
import { getSightings, createSighting } from '../actions/app-actions.js'

class App extends React.Component {
  constructor() {
    super();
    this.state = {

    }

  }
  componentWillMount() {
  this.props.getSightings();
  console.log("this.props", this.props)
  }

  render() {
    return (
        <div style={styles.mainContainer}>
            {this.props.children}
        </div>
    )
  }
}

function mapStateToProps(state) {
    return { sightings: state.sightings };
}

export default connect(mapStateToProps, {getSightings, createSighting})(App);

var styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

