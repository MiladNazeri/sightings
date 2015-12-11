import React from 'react';
import api from '../../api/api.js';

export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapToken: 'pk.eyJ1IjoiZ2VuZzA2MTAiLCJhIjoiM2E5YWIzMDU0YmQxZGVhMTI0NWFkZGI5NTk2Njk2ODkifQ.batYlvCbe9tWYG8Sc_OTZw',
            mapBox: null,
            mapView: {
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v8',
                center: [-122.6, 45.5],
                zoom: 9
            },
            allMapboxMarkers: [],
            sightings: this.props.sightings,
            whales: this.props.whales
        }
    }
    // _initMap(){
    //     var canv = this.refs.map;
    //     var nyc  = new google.maps.LatLng(40.7516399, -73.9746429);
    //     var opts = {
    //       center   : nyc,
    //       zoom     : 14,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }
    //       this.state.map = new google.maps.Map(canv, opts);
    //       new google.maps.Marker({ position: nyc, map: this.state.map, title: 'New York City Baby!' });
    // }
    _setMarkersOnMap(mapBox, myLayer, object){
        this.setState({
            allMapboxMarkers : []
        })
        object.map((item) => {
            var marker = Object.assign({},{
                id: item._id,
                type: 'Feature',
                geometry:{
                    type: "Point",
                    coordinates:[item.location[1],item.location[0]]
                },
                "properties": {
                    "title":item.title,
                    "image":item.photo,
                    "story":item.story,
                    "icon": {
                        "iconUrl": "icons/shark.svg",
                        "iconSize": [50, 50], // size of the icon
                        "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                        "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                        "className": "dot"
                    }
                }
            })
            console.log("this is an icon", marker.properties.icon);
            this.state.allMapboxMarkers.push(marker)
        })
        console.log("This is the mapbox markers", this.state.allMapboxMarkers)
        myLayer.on('layeradd', function(e) {
            var marker = e.layer,
            feature = marker.feature;
            marker.setIcon(L.icon(feature.properties.icon));
            var content = '<h2>'+ feature.properties.title+'<\/h2>' + '<img src="'+feature.properties.image+'" alt="" style="max-width:150px">' + '<br />'+ '<p>'+feature.properties.story + '</p>';
            marker.bindPopup(content);
        });
        myLayer.setGeoJSON(this.state.allMapboxMarkers)
        mapBox.fitBounds(myLayer.getBounds())
    }

    _showAllSightings(mapBox, myLayer){
        // this._initMap();
            console.log("initiating map")
        this._setMarkersOnMap(mapBox, myLayer, this.state.sightings)
    }

    componentDidMount() {
        L.mapbox.accessToken = this.state.mapToken;
        this.mapBox = L.mapbox.map('mapbox', 'mapbox.streets').setView([40.718243, -73.99868], 14);
        var myLayer = L.mapbox.featureLayer().addTo(this.mapBox);
        api.getSightings()
        .then( (res) => {
            console.log("res",res)
            var sightings = res.data
            this.setState({
                sightings: sightings,
            })
        })
        .then(() => {
            console.log("showing Sightings")
            this._showAllSightings(this.mapBox, myLayer);
        })

    }
    componentWillUnmount() {
        this.mapBox.remove();
    }
    render() {
            return (
                <div>
                    <div id="mapbox" style={styles.mapBox}></div>
                </div>
            )
    }

}

var styles = {
  map: {
    display: "none",
    height: 300,
    borderRadius: 10
  },
  mapBox: {
    // zIndex: "-100",
    // borderRadius: 10
  },
  background: {
    float: "left",
    height: "200px",
    width: "auto"

  }
}




// <div ref="map" style={styles.map}></div>


// <div id="mapFilter">
//     <div id = "mapFilterTitle">Filter</div>
//     <select value={this.state.selectedFilterValue} onChange={this._selectFilterHandler}>
//         <option value="select">Select an animal</option>
//          {animalOptions}
//     </select>
// </div>

// var animalOptions = [];
// this.state.allAnimalsSelect.forEach( (option, index) => {
//   animalOptions.push(<option key={index} value={option.value}>{option.label}</option>)
// })