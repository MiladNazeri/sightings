import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import axios from 'axios';
import ReactSelect from 'react-select';
import helper from '../utils/helper.js'
var $ = require('jquery-latest');

export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            pro: this.props.pro,
            title: "",
            long: "",
            lat: "",
            story: "",
            fileName: "",
            fileType: "",
            file: "",
            whalePick:"",
            whaleOptions: this.props.whaleOptions,
            whales: [],
            whaleOptions: [],
            sighting: {},
            sightings: [],
            sightingOptions: [],
            openModal: false,
            getSightings: this._getSightings,
            mapToken: 'pk.eyJ1IjoiZ2VuZzA2MTAiLCJhIjoiM2E5YWIzMDU0YmQxZGVhMTI0NWFkZGI5NTk2Njk2ODkifQ.batYlvCbe9tWYG8Sc_OTZw',
            mapBox: null,
            mapView: {
                zoom: 9
            },
            allMapboxMarkers: [],
        }
        this._updateWhaleValue = this._updateWhaleValue.bind(this)
        this._proComment = this._proComment.bind(this)
    }
    _setMarkersOnMap(mapBox, myLayer, object){
        var that = this;
        var newMarker;
        this.setState({
            allMapboxMarkers : []
        })
        // console.log("object", object);
        object.map((item) => {
            var marker = Object.assign({},{
                original: item,
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
            if(item.pending){
                marker.properties.icon.iconUrl = "icons/question.svg";
            }
            // console.log("this is an icon", marker.properties.icon);
            this.state.allMapboxMarkers.push(marker)
        })
        // console.log("This is the mapbox markers", this.state.allMapboxMarkers)
        myLayer.on('layeradd', function(e) {
            var marker = e.layer,
            feature = marker.feature;
            console.log(marker);
            if(feature){
                marker.setIcon(L.icon(feature.properties.icon));
                var content = "<div class='title-text'>"+ feature.properties.title+'</div>' + '<img src="'+feature.properties.image+'" alt="" style="width:100%">' + '<br />'+ '<div class="story-content">'+feature.properties.story+'</div>';
                content = content + "<div class='reply-text'>Reply</div><textarea class='reply-content' id='reply-form-"+marker.feature.id+"' style='width:100%'></textarea>";
                content = content + "<div class='button-container'>"+"<button class='reject-button'id='reject-form-"+marker.feature.id+"'>Reject</button>"+"<button class='approve-button'id='approve-form-"+marker.feature.id+"'>Approve</button>"+"</div>";
                marker.bindPopup(content);
                $("body").on("click", "#approve-form-"+marker.feature.id, function(e){
                    var approvedSighting = marker.feature.original
                    approvedSighting.proComment = $("#reply-form-"+marker.feature.id).val();
                    approvedSighting.pending = false;
                    approvedSighting.notAppropriate = false;
                    approvedSighting.proApprove = true;
                    console.log("approved sighting", approvedSighting);
                    console.log("that", that)
                    api.updateSighting(approvedSighting)
                    .then((sighting) => {
                        console.log("update sighting", sighting)
                        return api.getSightings()
                    })
                        .then( (sightings) => {
                            console.log("that 2", that)
                            console.log("Sighting back", sightings)
                            that.state.sightings = sightings.data;
                            that.mapBox.removeLayer(myLayer);
                            myLayer = {};
                            newMarker = false;
                            myLayer = L.mapbox.featureLayer().addTo(that.mapBox);
                            that._showAllSightings(that.mapBox, myLayer);
                        });
                    });
                $("body").on("click", "#reject-form-"+marker.feature.id, function(e){
                    var rejectedSighting = marker.feature.original
                    rejectedSighting.proComment = $("#reply-form-"+marker.feature.id).val();
                    rejectedSighting.pending = false;
                    rejectedSighting.notAppropriate = true;
                    rejectedSighting.proApprove = false;
                    console.log("rejected sighting", rejectedSighting);
                    api.updateSighting(rejectedSighting)
                    .then((sighting) => {
                        return api.getSightings()
                    })
                        .then( (sightings) => {
                            console.log("Sighting back", sighting)
                            that.state.sightings = sightings.data;
                            that.mapBox.removeLayer(myLayer);
                            myLayer = {};
                            newMarker = false;
                            myLayer = L.mapbox.featureLayer().addTo(that.mapBox);
                            that._showAllSightings(that.mapBox, myLayer);
                        });
                    });
             }
        })
        myLayer.setGeoJSON(this.state.allMapboxMarkers)
        mapBox.fitBounds(myLayer.getBounds())
    }
    _showAllSightings(mapBox, myLayer){
        // console.log("initiating map", this.state)
        this._setMarkersOnMap(mapBox, myLayer, this.state.sightings)
    }
    _getSightings(){
        // console.log(this);
        var _this = this;
        api.getSightings()
            .then( (sightings) => {
                _this.setState({
                sightings: sightings.data
            })
        })
        // console.log("underscore", _this);
    }
  _updateWhaleValue(e){
      this.setState({
          whalePick: e
      })
  }
  _proComment(e){
    this.setState({
      proComment: e.target.value
    })
  }

    componentDidMount() {
        var that = this;
        // console.log("that", that)
        L.mapbox.accessToken = that.state.mapToken;
        var myLayer;
        var newMarker;
        that.mapBox = L.mapbox.map('mapbox', 'geng0610.odfm6c8b').setView([40.718243, -73.99868], 14);
        myLayer = L.mapbox.featureLayer().addTo(that.mapBox);
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
            this._showAllSightings(this.mapBox, myLayer);
        });

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