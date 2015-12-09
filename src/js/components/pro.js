import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import Map from './map/map.js';
import MyModal from './form/mymodal.js';
import helper from '../utils/helper.js'

export default class Pro extends React.Component {

  constructor() {
    super();
    this.state = {
      whales: [],
      whaleOptions: [],
      sighting: {},
      sightings: [],
      sightingOptions: [],
      openModal: false,
      getSightings: this._getSightings
    }
    this._addButtonPress = this._addButtonPress.bind(this)
    this._closeModal = this._closeModal.bind(this)
  }
  _addButtonPress(){
    this.setState({
      openModal: true
    })

  }
  _closeModal(){
    this.state.getSightings();
    this.setState({
      openModal: false
    })
  }
  _getSightings(){
    api.getSightings()
    .then( (sightings) => {
      this.setState({
        sightings: sightings.data
      })
    })
  }
  componentDidMount(){
    api.getWhales()
    .then( (whales) => {
      var whaleOptions = helper._optionMaker(whales.data, "id", "whaleName")
      this.setState({
        whales: whales.data,
        whaleOptions: whaleOptions
      })
  })
    api.getSightings()
    .then( (sightings) => {
      this.setState({
        sightings: sightings.data
      })
    })
  }
  render() {
    var sighting={tite: "title", location: "2323,21323", photo: "http://cdn.sstatic.net/stackoverflow/img/apple-touch-icon@2.png?v=73d79a89bded&a", story: "amazing"}
    console.log("pro map")
    return (
        <div style={styles.mainContainer}>
          {this.state.openModal &&
            <MyModal
            openModal={this.state.openModal}
            user={false}
            pro={true}
            closeModal={this._closeModal}
            whaleOptions={this.state.whaleOptions}
            sighting={sighting} /> }
          <Map sightings={this.state.sightings} whales={this.state.whales} />
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


