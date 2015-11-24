import React from 'react';
import auth from "../utils/auth.js"

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      bounds: new google.maps.LatLngBounds()
    };
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
        <div ref="map" style={styles.map}></div>
    )
  }
};

var styles = {
  map: {
    height: 550,
    borderRadius: 10
  }
}
