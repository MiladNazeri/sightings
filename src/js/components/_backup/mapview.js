import React from 'react';
import auth from "../utils/auth.js";
import axios from 'axios';
import api from '../api/api.js';
import ReactDOM from 'react-dom';

export default class MapView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			map: null,
			bounds: new google.maps.LatLngBounds(),
			mapToken: 'pk.eyJ1IjoiZ2VuZzA2MTAiLCJhIjoiM2E5YWIzMDU0YmQxZGVhMTI0NWFkZGI5NTk2Njk2ODkifQ.batYlvCbe9tWYG8Sc_OTZw',
			mapBox: null,
			mapView: {
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v8',
				center: [-122.6, 45.5],
				zoom: 9
			},
			allSightings: [],
			allMapboxMarkers: [],
			allAnimals: [],
			allAnimalsSelect: [],
			selectedFilterValue: "select"
		}
		this._selectFilterHandler = this._selectFilterHandler.bind(this);
	}
	_initMap(){
		var canv = this.refs.map;
		var nyc  = new google.maps.LatLng(40.7516399, -73.9746429);
		var opts = {
		  center   : nyc,
		  zoom     : 14,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		  this.state.map = new google.maps.Map(canv, opts);
		  new google.maps.Marker({ position: nyc, map: this.state.map, title: 'New York City Baby!' });
	}
	// _filter(sourceObject, itemInSourceObject, itemInSourceObject2, filterByItem){
	// 	if(arguments.length === 4){
	// 		var sourceObject = sourceObject;
	// 		var	itemInSourceObject = itemInSourceObject;
	// 		var	itemInSourceObject2 = itemInSourceObject2;
	// 		var filterByItem = arguments[arguments.length-1];
	// 	}
	// 	if(arguments.length === 3){
	// 		var sourceObject = sourceObject;
	// 		var	itemInSourceObject = itemInSourceObject;
	// 		var	itemInSourceObject2 = null;
	// 		var filterByItem = arguments[arguments.length-1];
	// 	}
	// 	var filterByItem = arguments[arguments.length-1];
	// 	return sourceObject.filter( (item) => {
	// 		if(!itemInSourceObject2)
	// 			return item[itemInSourceObject] === filterByItem
	// 		return item[itemInSourceObject][itemInSourceObject2] === filterByItem
	// 	})
	// }
	_selectFilterHandler(e){
	console.log("selectfilter", e)
	this.setState({
	  selectedFilterValue: e.target.value
	})
	}
	setImageMarker(coordinates, animal, imagePath) {
		var marker = new RichMarker({
			position: coordinates,
			map     : this.state.map,
			title   : animal,
			content : `<div id="thumbnail-1" class="my-marker"><img width="65" height="40" class="map-thumbnail" src="${imagePath}" /></div>`
		})
		this.state.bounds.extend(marker.position)
		this.state.map.fitBounds(this.state.bounds)
	}
	// _setMarkersOnMap(mapBox, myLayer, object){
	// 	console.log("This is the object", object)
	// 	object.map( (item) => {
	// 		var marker = Object.assign({}, {
	// 			coordinates: new google.maps.LatLng(item.location[0], item.location[1]),
	// 			animalTitle: this._matchIdWithName(item.animal),
	// 			imagePath: item.mediaFull })
	// 		this.setImageMarker(marker.coordinates, marker.animalTitle, marker.imagePath)
	// 	})
	// 	this.state.allMapboxMarkers = [];
	// 	object.map((item) => {
	// 		var marker = Object.assign({},{
	// 			id: item._id,
	// 			type: 'Feature',
	// 			geometry:{
	// 				type: "Point",
	// 				coordinates:[item.location[1],item.location[0]]
	// 			},
	// 			"properties": {
	// 				"title":item.animal.name,
	// 				"image":item.mediaFull,
	// 				"icon": {
	// 					"iconUrl": "icons/"+item.animal.name+".svg",
	// 					"iconSize": [50, 50], // size of the icon
	// 					"iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
	// 					"popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
	// 					"className": "dot"
	// 				}
	// 			}
	// 		})
	// 		console.log(marker.properties.icon);
	// 		this.state.allMapboxMarkers.push(marker)
	// 	})
	// 	console.log("This is the mapbox markers", this.state.allMapboxMarkers)
	// 	myLayer.on('layeradd', function(e) {
	// 		var marker = e.layer,
	// 		feature = marker.feature;
	// 		marker.setIcon(L.icon(feature.properties.icon));
	// 		var content = '<h2>'+ feature.properties.title+'<\/h2>' + '<img src="'+feature.properties.image+'" alt="" style="max-width:150px">';
	// 		marker.bindPopup(content);
	// 	});
	// 	myLayer.setGeoJSON(this.state.allMapboxMarkers)
	// 	mapBox.fitBounds(myLayer.getBounds())
	// }




	componentDidMount() {

	componentWillUnmount() {
		this.mapBox.remove();
	}
	render() {

		return (
			<div>
				<div ref="map" style={styles.map}></div>
				<div id="mapbox" style={styles.mapBox}></div>
				<div id="mapFilter">
					<div id = "mapFilterTitle">Filter</div>
					<select value={this.state.selectedFilterValue} onChange={this._selectFilterHandler}>
						<option value="select">Select an animal</option>
						 {animalOptions}
					</select>
					<button onClick={this._sortByAnimal.bind(this)}>Sort by Animal</button>
					<button onClick={this._sortByUser.bind(this)}>Sort by user</button>
					<button onClick={this._showAllSightings.bind(this)}>Show All Sightings</button>
				</div>
			</div>
		)
	}
}

