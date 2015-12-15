import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import Map from './map/map.js';
import MyModal from './form/mymodal.js';
import helper from '../utils/helper.js'

export default class User extends React.Component {

  constructor() {
    super();
    this.state = {
      whales: [],
      whaleOptions: [],
      sighting: {},
      sightings: [],
      sightingOptions: [],
      openModal: false,
      getSightings: this._getSightings,
      coordinates: ""
    }
    this._addButtonPress = this._addButtonPress.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this._getSightings = this._getSightings.bind(this)
  }
  _addButtonPress(coordinates){
    console.log("coordinates from function", coordinates)
    console.log("coordinates from state", this.state.coordinates)
    console.log(this);
    this.setState({
      openModal: true,
      coordinates: coordinates
    })
    console.log("done", this);

  }
  _closeModal(){
    this.setState({
      sightings: [],
      openModal: false
    })
    this.state.getSightings.call(this);

  }
  _getSightings(){
    console.log(this);
    var _this = this;
    api.getSightings()
    .then( (sightings) => {
      _this.setState({
        sightings: sightings.data
      })
    })
    console.log("underscore", _this);
  }
  componentDidMount(){
    api.getWhales()
    .then( (whales) => {
      var whaleOptions = helper._optionMaker(whales.data, whales.data.id, whales.data.whaleName)
      this.setState({
        whales: whales.data,
        whaleOptions: whaleOptions
      });
  });
    api.getSightings()
    .then( (sightings) => {
      this.setState({
        sightings: sightings.data
      });
    });
  }
  render() {
    console.log("user map")
    return (
        <div style={styles.mainContainer}>
          {this.state.openModal && <MyModal openModal={this.state.openModal} user={true} pro={false} closeModal={this._closeModal} whaleOptions={this.state.whaleOptions} coordinates={this.state.coordinates}  /> }
          {this.state.sightings.length > 0 && <Map sightings={this.state.sightings} whales={this.state.whales} addButtonPress={this._addButtonPress}/> }
          <div id = "addButton" onClick={this._addButtonPress}><div><img id="addButtonIcon" src="images/add-icon.png"/></div></div>
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


