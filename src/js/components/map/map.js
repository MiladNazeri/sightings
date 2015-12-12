import React from 'react';
import api from '../../api/api.js';

export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mapToken: 'pk.eyJ1IjoiZ2VuZzA2MTAiLCJhIjoiM2E5YWIzMDU0YmQxZGVhMTI0NWFkZGI5NTk2Njk2ODkifQ.batYlvCbe9tWYG8Sc_OTZw',
            mapBox: null,
            mapView: {
                zoom: 9
            },
            allMapboxMarkers: [],
            sightings: this.props.sightings,
            whales: this.props.whales
        }
    }
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
                        "iconUrl": "icons/whale.svg",
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
            if(feature){
                marker.setIcon(L.icon(feature.properties.icon));
                var content = '<h2>'+ feature.properties.title+'<\/h2>' + '<img src="'+feature.properties.image+'" alt="" style="max-width:150px">' + '<br />'+ '<p>'+feature.properties.story 
                + '</p><div id = "addButton" onClick={this._addButtonPress}><div><img id="addButtonIcon" src="images/add-icon.png"/></div></div>' ;
                marker.bindPopup(content);
            }
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
        this.mapBox = L.mapbox.map('mapbox', 'geng0610.odfm6c8b').setView([40.718243, -73.99868], 14);
        this.mapBox.on('click', addMarker);
        var myLayer = L.mapbox.featureLayer().addTo(this.mapBox);
        var newMarker;
        function addMarker(e){
            // Add marker to map at click location; add popup window
            if(newMarker){
                newMarker.setLatLng(e.latlng)
                newMarker.openPopup();
            } else{
                newMarker = new L.marker(e.latlng).addTo(myLayer);
                newMarker.bindPopup("<div>hey</div>");
                newMarker.openPopup();
            }
            console.log("new marker", newMarker);
        }
        this._showAllSightings(this.mapBox, myLayer);

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