import React from 'react';
import { Router, Route, Link } from 'react-router';
import ReactDOM from 'react-dom';
import api from '../api/api.js';
import axios from 'axios';
import ReactSelect from 'react-select';
import helper from '../utils/helper.js'
var $ = require('jquery');
import { connect } from 'react-redux';
import { getSightings, createSighting } from '../actions/app-actions.js'


class Map extends React.Component {

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
			userWhalePick:"",
			whales: [],
			sighting: {},
			sightingOptions: [],
			openModal: false,
            mapToken: 'pk.eyJ1IjoiZ2VuZzA2MTAiLCJhIjoiM2E5YWIzMDU0YmQxZGVhMTI0NWFkZGI5NTk2Njk2ODkifQ.batYlvCbe9tWYG8Sc_OTZw',
            mapBox: null,
            mapView: {
                zoom: 9
            },
            allMapboxMarkers: [],
        }
    }
    _setMarkersOnMap(mapBox, myLayer, object){
        ("object",object)
        this.setState({
            allMapboxMarkers : []
        })
        // ("object", object);
        object.map((item) => {
            console.log("item", item)
            if(!item.notAppropriate){
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
                    "userWhalePick":item.userWhalePick,
                    "proWhalePick":item.proWhalePick,
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
            // ("this is an icon", marker.properties.icon);
            this.state.allMapboxMarkers.push(marker)
         }
        })
        function whalePick(whale = "Andrew’s Beaked Whale", object){
        console.log("that.state.whaleOptions",that.state.whaleOptions)
        let whaleIndex = that.state.whaleOptions.indexOf(whale);
        console.log("whale", whale)
        console.log("whaleIndex", whaleIndex)
        console.log("object", object)
        return object[whaleIndex].referenceImage;
        }
        var that = this;
        // ("This is the mapbox markers", this.state.allMapboxMarkers)
        myLayer.on('layeradd', function(e) {
            var marker = e.layer,
            feature = marker.feature;
            if(feature){
                console.log("feature", feature)
                marker.setIcon(L.icon(feature.properties.icon));
                if (feature.properties.proComment) {
                var content = "<div class='title-text'>"+ feature.properties.title+'</div>' + '<img src="'+feature.properties.image+'" alt="" style="width:100%">' + '<br />'+ '<div class="story-content">'+feature.properties.story+'</div><div class="whale-options"> They think they saw a: </br>'+ feature.properties.userWhalePick +'</div><div class="whale-image"><img id="whalePicImage" src="' + whalePick(feature.properties.userWhalePick, that.props.whales) + '" /></div>'
                '<div class="proComment-content"> <strong>Whale Pro Reply:</strong> <br />' +feature.properties.proComment+'</div>';
                    if(feature.properties.proWhalePick) {
                        content = content + '<div class="whale-options"> The Pro thinks it was a: </br>'+ feature.properties.proWhalePick +'</div><div class="whale-image"><img id="whalePicImage" src="' + whalePick(feature.properties.proWhalePick, that.props.whales) + '" /></div>'
                    }
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
        // ("initiating map", this.state)
        if(this.props.sightings.length>0){
            this._setMarkersOnMap(mapBox, myLayer, this.props.sightings)
             }
	}

    componentWillMount() {
        console.log("this.props.whales", this.props.whales)
        const whaleList = this.props.whales.map( (whale) => {
            return whale.whaleName
        })
        console.log("whaleList", whaleList)
        this.setState({
            whaleOptions: whaleList
        })
        console.log("whaleOptions", this.state.whaleOptions)
    }



    componentDidMount() {

        var that = this;
        // ("that", that)
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
        userForm.userWhalePick = "<div class='whale-Options'>Choose which whale you think you saw</div><select id='whaleSelect'>" + that.state.whaleOptions.map( (whale) => {
            return "<option value=" + JSON.stringify(whale) + ">" + JSON.stringify(whale) +  "</option>" }) + "</select>";
        userForm.userWhalePickImage = "<div class='whale-image'><img id='whalePicImage' src='" + whalePick($("#whaleSelect").val(), that.props.whales) + "' /></div>"
        userForm.submitButton = "<div class='button-container'><button id='submit-form'>submit</button>";
        $('body').on('change', '#whaleSelect', function(){

            $('#whalePicImage').attr("src", whalePick($(this).val(), that.props.whales))
        })

        function whalePick(whale = "Andrew’s Beaked Whale", object){
        console.log("that.state.whaleOptions",that.state.whaleOptions)
        let whaleIndex = that.state.whaleOptions.indexOf(whale);
        console.log("whale", whale)
        console.log("whaleIndex", whaleIndex)
        console.log("object", object)
        return object[whaleIndex].referenceImage;
        }

        function generateSubmit(latlng){
            var lat = latlng.lat;
            var long = latlng.lng;
            that.setState({
                lat,
                long
            })
            $("body").on("click", "#submit-form", function(e){
                    var title = $("#form-title").val();
                    var story = $("#form-story").val();
                    var file = $("#form-picture").prop('files')[0];
                    var userWhalePick = $("#whaleSelect").val();
                    var filename = file.name;
                    var filetype = file.type;
                    that.setState({
                        title,
                        story,
                        filename,
                        filetype,
                        file,
                        userWhalePick
                    })
                    axios.post('/api/s3/sign_s3', {
                        filename: that.state.filename,
                        filetype: that.state.filetype
                    }).then( (result) =>{
                      var signedUrl = result.data;
                      axios.put(signedUrl, that.state.file)
                    }).then( () => {
                      that.setState({
                        imagePath: `https://mobyclick.s3-us-west-2.amazonaws.com/${that.state.filename}`
                      })
                      var sighting = {
                        title: that.state.title,
                        location: [that.state.lat, that.state.long],
                        story: that.state.story,
                        photo: that.state.imagePath,
                        userWhalePick: that.state.userWhalePick
                      }
                      that.props.createSighting(sighting)
                      .then( (sightings) => {
                        that.state.sightings = sightings.data;
                        that.mapBox.removeLayer(myLayer);
                        myLayer = {};
                        newMarker = false;
                        myLayer = L.mapbox.featureLayer().addTo(that.mapBox);
                        that._showAllSightings(that.mapBox, myLayer);
                        });
                    })
                });

        }


        function updateSubmit(latlng){
            var lat = latlng.lat;
            var long = latlng.lng;
            that.setState({
                lat,
                long
            })
        }

        function addMarker(e){
            if(newMarker){
            	("new Marker exists", newMarker);
                newMarker.setLatLng(e.latlng)
                userForm.LatLng = "<div id = 'form-latlng'>"+e.latlng+"</div>"
                popupContent ="";
                for (var element in userForm){
                    popupContent = popupContent + userForm[element];
                }
                var popup = L.popup({keepInView: true, maxHeight: 500})
                    .setContent(popupContent)
                newMarker.bindPopup(popup);
                newMarker.openPopup();
                updateSubmit(e.latlng);
            } else{
                newMarker = L.marker(e.latlng, {
                    draggable: true
                });
                newMarker.addTo(myLayer);
                (newMarker);
                newMarker.options.draggable = true;
                userForm.LatLng = "<div id = 'form-latlng'>"+e.latlng+"</div>"
                var popupContent ="";
                for (var element in userForm){
                    popupContent = popupContent + userForm[element];
                }
                var popup = L.popup({keepInView: true, maxHeight: 500})
                    .setContent(popupContent)
                newMarker.bindPopup(popup);
                newMarker.openPopup();
                generateSubmit(e.latlng);
            }
        }
        this.props.getSightings()
        .then( () => {
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
                    <div id = "addButton"><div><Link to="/pro"><img id="addButtonIcon" src="images/mobyPro.png"/></Link></div></div>
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
  background: {
    float: "left",
    height: "200px",
    width: "auto"

  }
}

function mapStateToProps(state) {
    return { sightings: state.sightings,
              whales: state.whales
     };
}

export default connect(mapStateToProps, {getSightings, createSighting})(Map);