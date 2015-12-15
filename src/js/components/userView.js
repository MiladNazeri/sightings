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
        this.setState({
            allMapboxMarkers : []
        })
        // console.log("object", object);
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
                    "proComment":item.proComment,
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
            if(feature){
                marker.setIcon(L.icon(feature.properties.icon));
                if (feature.properties.proComment) {
                var content = "<div class='title-text'>"+ feature.properties.title+'</div>' + '<img src="'+feature.properties.image+'" alt="" style="width:100%">' + '<br />'+ '<div class="story-content">'+feature.properties.story+'</div>' + '<div class="proComment-content"> Whale Pro Reply: <br />' +feature.properties.proComment+'</div>';
                } else {
                    var content = "<div class='title-text'>"+ feature.properties.title+'</div>' + '<img src="'+feature.properties.image+'" alt="" style="width:100%">' + '<br />'+ '<div class="story-content">'+feature.properties.story+'</div>';

                }
                marker.bindPopup(content);
            }
        });
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
    	that.mapBox.on('click', addMarker);
    	myLayer = L.mapbox.featureLayer().addTo(that.mapBox);
        var userForm = {}
        userForm.Title = "<div class='title-text'>Title of your sighting</div><input id='form-title' type='text'/>";
        userForm.LatLng = "";
        userForm.Picture = "<div class='picture-text'>Share your sighting</div><input id='form-picture' type='file'>";
        userForm.Story = "<div class='story-text'>Story behind this sighting</div><textarea class='story-content' id='form-story'></textarea>";
        userForm.submitButton = "<div class='button-container'><button id='submit-form'>submit</button>";
        function generateSubmit(latlng){
            // console.log("clicked");
            var lat = latlng.lat;
            var long = latlng.lng;
            // console.log(title, lat, long, story, file, filename, filetype);
            that.state.lat = lat;
            that.state.long = long;
            // console.log("posting to node")
			$("body").on("click", "#submit-form", function(e){
                var title = $("#form-title").val();
                var story = $("#form-story").val();
                var file = $("#form-picture").prop('files')[0];
                var filename = file.name;
                var filetype = file.type;
                that.state.title = title;
                that.state.story = story;
                that.state.filename = filename;
                that.state.filetype = filetype;
                that.state.file = file;
				axios.post('/api/s3/sign_s3', {
				    filename: that.state.filename,
				    filetype: that.state.filetype
				}).then( (result) =>{
				  // console.log("posting to s3")
				  var signedUrl = result.data;
				  axios.put(signedUrl, that.state.file)
				}).then( () => {
				  // console.log("setting image path to node")
				  that.setState({
				    imagePath: `https://mobyclick.s3-us-west-2.amazonaws.com/${that.state.filename}`
				  })
				  var sighting = {
				    title: that.state.title,
				    location: [that.state.lat, that.state.long],
				    story: that.state.story,
				    photo: that.state.imagePath
				  }
				  // console.log("posting to create sighting")
				  api.createSighting(sighting)
				}).then(() => {
					api.getSightings()
					.then( (sightings) => {
						that.state.sightings = sightings.data;
						that.mapBox.removeLayer(myLayer);
						myLayer = {};
						newMarker = false;
						myLayer = L.mapbox.featureLayer().addTo(that.mapBox);
				        that._showAllSightings(that.mapBox, myLayer);
					});
				});
			});
            console.log("this is the state after onclick", that.state);
        }

        function updateSubmit(latlng){
            var lat = latlng.lat;
            var long = latlng.lng;
            that.state.lat = lat;
            that.state.long = long;
            console.log("this is the state after updatesubmit",that.state);
        }

        function addMarker(e){
            if(newMarker){
            	console.log("new Marker exists", newMarker);
                newMarker.setLatLng(e.latlng)
                userForm.LatLng = "<div id = 'form-latlng'>"+e.latlng+"</div>"
                popupContent ="";
                for (var element in userForm){
                    popupContent = popupContent + userForm[element];
                }
                newMarker.bindPopup(popupContent);
                newMarker.openPopup();
                updateSubmit(e.latlng);
            } else{
                newMarker = L.marker(e.latlng, {
                    draggable: true
                });
                newMarker.addTo(myLayer);
                console.log(newMarker);
                newMarker.options.draggable = true;
                userForm.LatLng = "<div id = 'form-latlng'>"+e.latlng+"</div>"
                var popupContent ="";
                for (var element in userForm){
                    popupContent = popupContent + userForm[element];
                }
                newMarker.bindPopup(popupContent);
                newMarker.openPopup();
                generateSubmit(e.latlng);
            }
            console.log("new marker", newMarker);
        }
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