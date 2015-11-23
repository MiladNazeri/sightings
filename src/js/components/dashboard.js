import React from 'react';

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      map: null,
      bounds: new google.maps.LatLngBounds()
    };
  }
  componentDidMount() {
    var canv = this.refs.map; // in React 0.14 this should reference the DOM node of "map" directly without a getDOMNOde()
    var nyc  = new google.maps.LatLng(40.7516399, -73.9746429);
    var opts = {
      center   : nyc,
      zoom     : 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.state.map = new google.maps.Map(canv, opts);

    new google.maps.Marker({ position: nyc, map: this.state.map, title: 'New York City Baby!' });
  }
  setMarker(coordinates, title) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(coordinates),
      map     : this.state.map,
      title   : title
    });

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
    height: 500,
    borderRadius: 10
  }
}
