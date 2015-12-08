import React from 'react';
import auth from "../utils/auth.js";
import axios from 'axios';
import api from '../api/api.js';

export default class MapView extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			map: null,
			bounds: new google.maps.LatLngBounds(),
			allSightings: [],
			allAnimals: [],
			allAnimalsSelect: [],
			selectedFilterValue: "select"
		}
		this._selectFilterHandler = this._selectFilterHandler.bind(this);
	}
	setImageMarker(coordinates, animal, imagePath) {
	var marker = new RichMarker({
	  position: coordinates,
	  map     : this.state.map,
	  title   : animal,
	  content : `<div id="thumbnail-1" class="my-marker"><img width="65" height="40" class="map-thumbnail" src="${imagePath}" /></div>`
	})
	this.state.bounds.extend(marker.position);
	this.state.map.fitBounds(this.state.bounds);
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
	_filter(sourceObject, itemInSourceObject, itemInSourceObject2, filterByItem){
		if(arguments.length === 4){
			var sourceObject = sourceObject;
			var	itemInSourceObject = itemInSourceObject;
			var	itemInSourceObject2 = itemInSourceObject2;
			var filterByItem = arguments[arguments.length-1];
		}
		if(arguments.length === 3){
			var sourceObject = sourceObject;
			var	itemInSourceObject = itemInSourceObject;
			var	itemInSourceObject2 = null;
			var filterByItem = arguments[arguments.length-1];
		}
		var filterByItem = arguments[arguments.length-1];
		return sourceObject.filter( (item) => {
			if(!itemInSourceObject2)
				return item[itemInSourceObject] === filterByItem
			return item[itemInSourceObject][itemInSourceObject2] === filterByItem
		})
	}
	_selectFilterHandler(e){
	console.log("selectfilter", e)
	this.setState({
	  selectedFilterValue: e.target.value
	})
	}
	_setMarkersOnMap(object){
		object.map( (item) => {
			var marker = Object.assign({}, {
				coordinates: new google.maps.LatLng(item.location[0], item.location[1]),
				animalTitle: this._matchIdWithName(item.animal),
				imagePath: item.mediaFull })
			this.setImageMarker(marker.coordinates, marker.animalTitle, marker.imagePath)
			})
	}
    _matchIdWithName(id){
      for (var i = 0; i < this.state.allAnimalsSelect.length; i++){
        if(this.state.allAnimalsSelect[i].value === id) {
          return this.state.options[i].label
        }
	  }
	}
	_sortByUser(){
		var setFilters = this._filter( this.state.allSightings, "userId", auth.getToken() )
		console.log("setFilters user", setFilters)
		this._initMap();
		this._setMarkersOnMap(setFilters);
	}
	_sortByAnimal(){
	 var setFilters = this._filter( this.state.allSightings, "animal", "id", this.state.selectedFilterValue)
	 console.log("setFilters animal", setFilters)
	 this._initMap();
	  this._setMarkersOnMap(setFilters)
	}
	_showAllSightings(){
		this._initMap();
		this._setMarkersOnMap(this.state.allSightings)
	}
	_showAnimalByTime(){
		var setFilters = this._filter( this.state.allSightings, "animal", "id", this.state.selectedFilterValue);
		function compare(a, b) {
			if(a.time < b.time)
				return -1;
			if(a.time > b.time)
				return 1;
			else
				return 0;
		};
		setFilters.sort(compare);
		console.log("setFilters time", setFilters);
		console.log(this._setMarkersOnMap);
		for(var i = 1; i <= setFilters.length; i++) {
			setTimeout(function (x) {
				return function () {

					this._setMarkersOnMap(setFilters[x-1]);
				};
			}(i), i * 500);
		}
	}
	componentDidMount() {
		api.getAnimals()
		.then( (res) => {
			var allAnimals = res.data
			var allAnimalsSelect = allAnimals.map( animal => {
				return Object.assign({}, {value: animal.id, label: animal.name})
			})
			this.setState({
				allAnimals: allAnimals,
				allAnimalsSelect: allAnimalsSelect
			})
		})
		api.getSightings()
		.then( (res) => {
			console.log("res",res)
			var allSightings = res.data
			this.setState({
				allSightings: allSightings,
			})

		})
		.then(() => {
			this._showAllSightings();
		})
	}
	render() {
		var animalOptions = [];
		this.state.allAnimalsSelect.forEach( (option, index) => {
		  animalOptions.push(<option key={index} value={option.value}>{option.label}</option>)
		})
		return (
			<div>
				<div ref="map" style={styles.map}></div>
				Filter map by :
				<select value={this.state.selectedFilterValue} onChange={this._selectFilterHandler}>
					<option value="select">Select an animal</option>
					 {animalOptions}
				</select>
				<br />
				<button onClick={this._sortByAnimal.bind(this)}>Sort by Animal</button>
				<br />
				<button onClick={this._sortByUser.bind(this)}>Sort by user</button>
				<br />
				<button onClick={this._showAllSightings.bind(this)}>Show All Sightings</button>
				<br />
				<button onClick={this._showAnimalByTime.bind(this)}>Show Migration Pattern</button>
			</div>
		)
	}
}

var styles = {
  map: {
    height: 550,
    borderRadius: 10
  },
  background: {
    float: "left",
    height: "200px",
    width: "auto"

  }
}