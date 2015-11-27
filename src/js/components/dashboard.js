import React from 'react';
import auth from "../utils/auth.js";
import axios from 'axios';
import api from '../api/api.js';


export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      bounds: new google.maps.LatLngBounds(),
      lat: "",
      long: "",
      animal: "",
      imagePath: "",
      uploading: false,
      uploaded: true,
      filename: "",
      filetype: ""
    };
    this.updateCoordinatesLat = this.updateCoordinatesLat.bind(this)
    this.updateCoordinatesLong = this.updateCoordinatesLong.bind(this)
    this.updateAnimal = this.updateAnimal.bind(this)
  }
  _updateCoordinatesLat(e){
    this.setState({
      coordinates: e.target.value
    })
  }

  _updateCoordinatesLong(e){
    this.setState({
      coordinates: e.target.value
    })
  }
  _updateAnimal(e){
    this.setState({
      animal: e.target.value
    })
  }
  _submitPicture(e){
  var file = e.target.files[0];

  this.setState({
      filename: file.name,
      filetype: file.type,
      uploading: true
  })

  axios.post('/api/sign_s3', {
      filename: file.name,
      filetype: file.type
  })
  .then((result)=>{
      console.log("axis post results ", result)
      var signedUrl = result.data;

      var options = {
          headers: {
              'Content-Type': file.type
          }
      };
      return axios.put(signedUrl, file, options)
  }).then( (results) => {
      this.setState({
      uploading: false,
      uploaded:true
      })
      console.log("image returning from AWS", results)
      this._updateImg()
    })
  }
  _updateImg(){
    var path = `https://mobyclick.s3-us-west-2.amazonaws.com/${this.state.filename}`
    this.setState({
        imagePath: path
    })
  }

  _submitSighting() {
    //get geoLocation
    var coordinates = new google.maps.LatLng(this.state.lat, this.state.long);
    //get animal type
    var animal = this.state.animal;
    //get imagePath
    var imagePath = this.state.imagePath;
    //make sighting database object
    var sighting = {
      animal: animal,
      location: [this.state.lat, this.state.long],
      mediaFull: imagePath
    }
    //Send sighting info to api
    api.createSighting(sighting)
    .then( (results) => {
      //place sighting on map
      this.setImageMarker(coordinates, animal, imagePath);
    })
  }
  componentDidMount() {
    // setting up the map and centering it on NYC
    var canv = this.refs.map; // in React 0.14 this should reference the DOM node of "map" directly without a getDOMNOde()
    var nyc  = new google.maps.LatLng(40.7516399, -73.9746429);
    var opts = {
      center   : nyc,
      zoom     : 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.state.map = new google.maps.Map(canv, opts);
    new google.maps.Marker({ position: nyc, map: this.state.map, title: 'New York City Baby!' });

    // need to replace this with a function that calls the setImageMarker function for each sighting
    var coordinates = new google.maps.LatLng(40.7687269, -74.0008466);
    var animal = "Humpback Whale";
    var imagePath = "http://i.huffpost.com/gen/1527948/thumbs/o-HUMPBACK-WHALE-HAWAII-900.jpg?1";

    // this sets a specific marker, need to pass this function basically every image we want to display, and can use this to refilter the data, maybe filter is another function that returns filtered data and is run through this function again?
    this.setImageMarker(coordinates, animal, imagePath);
  }
  // this function places a normal icon on the map
  // setMarker(coordinates, title) {
  //   var marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(coordinates),
  //     map     : this.state.map,
  //     title   : title
  //   });
  //
  //   this.state.bounds.extend(marker.position);
  //   this.state.map.fitBounds(this.state.bounds);
  // }
  // this function places a thumbnail sized image on the map instead of an icon
  setImageMarker(coordinates, animal, imagePath) {
    var marker = new RichMarker({
      position: coordinates,
      map     : this.state.map,
      title   : animal,
      content : `<div id="thumbnail-1" class="my-marker"><img width="65" height="40" class="map-thumbnail" src="${imagePath}" /></div>`
    })

    // these should extend the map bounds to fit based on any new sightings (still not working, zooms in too close)
    this.state.bounds.extend(marker.position);
    this.state.map.fitBounds(this.state.bounds);
  }
  render() {
    return (
        <div>
          <div ref="map" style={styles.map}></div>
          <div>
            <input type="text" onChange={this._updateCoordinatesLat} > Lat </input>
            <input type="text" onChange={this._updateCoordinatesLong} > Long </input>
            <input type="text" onchange={this._updateAnimal} > Aniaml </input>
            <input type="file" onChange={this._submitPicture.bind(this)}>Upload File</input>
            <button onClick={_submitSighting.bind(this)}>SubmitSighting</button>
          </div>
        </div>
    )
  }
};

var styles = {
  map: {
    height: 550,
    borderRadius: 10
  }
}
