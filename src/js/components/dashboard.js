import React from 'react';
import auth from "../utils/auth.js";
import axios from 'axios';
import api from '../api/api.js';
//save that list to a variable on state
// .then( (animals) => this.setState = {
//   animals: animals
// })
//use that list to make a select list of animals
// var animalList = this.state.animals.forEach( (animal) => {

// })


//have option add new on list
  //if option add new, open up input
  //save input to animal list on server
  //return back new animal id
//save id with new sighting
//

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      map: null,
      bounds: new google.maps.LatLngBounds(),
      lat: "",
      long: "",
      animal: "",
      coordinates: "",
      newAnimal: "",
      animals: [],
      options: [],
      newAnimalSelect: false,
      newAnimalID: "",
      selectedValue: "select",
      imagePath: "",
      uploading: false,
      uploaded: true,
      filename: "",
      filetype: "",
      sightings: []
    }
    this._updateCoordinatesLat = this._updateCoordinatesLat.bind(this);
    this._updateCoordinatesLong = this._updateCoordinatesLong.bind(this);
    this._updateCoordinates = this._updateCoordinates.bind(this);
    this._updateAnimal = this._updateAnimal.bind(this);
    this._updateValue = this._updateValue.bind(this);
    this._selectHandler = this._selectHandler.bind(this);
    this._initSettings = this._initSettings.bind(this);
    this._setAllSightingsInDatabase = this._setAllSightingsInDatabase.bind(this);
    this._matchIdWithName = this._matchIdWithName.bind(this);
  }
  _initSettings(){
    this.setState({
      lat: "",
      long: "",
      animal: "",
      coordinates: "",
      newAnimal: "",
      newAnimalSelect: false,
      newAnimalID: "",
      selectedValue: "select",
      imagePath: "",
      filename: "",
      filetype: "",

    })
  }
  _updateCoordinatesLat(e){
    this.setState({
      lat: parseFloat(e.target.value)
    })
  };
  _updateCoordinatesLong(e){
    this.setState({
      long: parseFloat(e.target.value)
    })
  };
  _updateCoordinates(e){
    this.setState({
      coordinates: e.target.value,
      lat: e.target.value.split(',')[0],
      long: e.target.value.split(',')[1]
    })
  };
  _updateAnimal(e){
    this.setState({
      animal: e.target.value
    })
  };
  _submitPicture(e){
  var file = e.target.files[0];
  this._updateImg();

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
  })
  .then( (results) => {
      this.setState({
      uploading: false,
      uploaded:true
      })
      console.log("image upload status returning from AWS", results)
      console.log("image path before update img: ", this.state.imagePath)
      this._updateImg()
      console.log("image path after update img: ", this.state.imagePath)

    })
  }
  _updateImg(){
    var path = `https://mobyclick.s3-us-west-2.amazonaws.com/${this.state.filename}`
    this.setState({
        imagePath: path
    })
  }
  _submitSighting() {
    console.log("SUBMIT SIGHTING PRESSED")
    //get geoLocation
    // var coordinates = new google.maps.LatLng(this.state.coordinates);
    var animalIDForSightingObject = "replace"
    var coordinates = new google.maps.LatLng(this.state.lat, this.state.long);
    //get animal type

    console.log("newAnimalSelect", this.state.newAnimalSelect)
    console.log("SelectedValue", this.state.selectedValue )
    console.log("Animal", this.state.animal )

    if (this.state.newAnimalSelect && this.state.animal){
      console.log("this.state.newAnimalSelect && this.state.animal")
      api.createAnimal({name: this.state.animal})
      .then( (newAnimalID) => {
        console.log("Just did api api.createAnimal call: ", newAnimalID.data.id)
        console.log("animalIDForSightingObject value:",animalIDForSightingObject)
        this.setState({
          newAnimalID: newAnimalID.data.id
        })
      }).then( () => {
        console.log("new state.newAnimalID", this.state.newAnimalID)
        animalIDForSightingObject = this.state.newAnimalID;
        console.log("animalIDForSightingObject after set by state", animalIDForSightingObject )
      } ).then( () => {
        console.log("animalIDForSightingObject var is set to :", animalIDForSightingObject)
        //get imagePath
        var imagePath = this.state.imagePath;
        //make sighting database object
        var sighting = {
          animal: animalIDForSightingObject,
          location: [this.state.lat, this.state.long],
          mediaFull: imagePath
        }
        //Send sighting info to api
        api.createSighting(sighting)
        .then( (results) => {
          //place sighting on map
          console.log("response from createsighting api: ", results)
          console.log("this.state.options: ", this.state.options)
          console.log("this.state.animals: ", this.state.animals)
          var animalTitle = ""
          for (var i = 0; i < this.state.options.length; i++){
            if(this.state.options[i].value === animalIDForSightingObject) {
              animalTitle = this.state.options[i].label
              break;
            }
          }
          console.log("coordinates, animalTitle, imagePath", coordinates, animalTitle, imagePath)
          this.setImageMarker(coordinates, animalTitle, imagePath);
          this._initSettings();
        })
      })
    }
    if (!this.state.newAnimalSelect && this.state.selectedValue){
      console.log("!this.state.newAnimalSelect && this.state.selectedValue")
        animalIDForSightingObject = this.state.selectedValue
        var imagePath = this.state.imagePath;
        //make sighting database object
        var sighting = {
          animal: animalIDForSightingObject,
          location: [this.state.lat, this.state.long],
          mediaFull: imagePath
        }
        //Send sighting info to api
        api.createSighting(sighting)
        .then( (results) => {
          //place sighting on map
          console.log("response from createsighting api: ", results)
          console.log("this.state.options: ", this.state.options)
          console.log("this.state.animals: ", this.state.animals)
          var animalTitle = ""
          for (var i = 0; i < this.state.options.length; i++){
            if(this.state.options[i].value === animalIDForSightingObject) {
              animalTitle = this.state.options[i].label
              break;
            }
          }
          console.log("coordinates, animalTitle, imagePath", coordinates, animalTitle, imagePath)
          this.setImageMarker(coordinates, animalTitle, imagePath);
          this._initSettings();
        })
      }

  }
  _matchIdWithName(id){
    for (var i = 0; i < this.state.options.length; i++){
      if(this.state.options[i].value === id) {
        return this.state.options[i].label
        break;
      }
  }
}
  _setAllSightingsInDatabase(e){
    //get all sightings in database
    api.getSightings()
    .then( (res) => {
      console.log("Results from getSightings", res)
      var sightingArray = res.data
      //use the setMarker function on each sighting
      var setMarkersObject = sightingArray.map( (sighting) => {
        console.log("this is a sighting in sightingArray:", sighting)
          var marker = Object.assign({},{
            coordinates: new google.maps.LatLng(sighting.location[0], sighting.location[1]),
            animalTitle: this._matchIdWithName(sighting.animal),
            imagePath: sighting.mediaFull })
        this.setImageMarker(marker.coordinates, marker.animalTitle, marker.imagePath);
      })
      console.log("setMarkersObject made", setMarkersObject)

      console.log("")
    })
    //
    //
  }
  _updateValue(e){
    this.setState({
      selectedValue: e
    })
  }
  _selectHandler(e){
    console.log("select event handler:", e)
    this.setState({
      selectedValue: e.target.value,
      newAnimalSelect: false
    })
    console.log(e.target.value)
    console.log("state selected value", this.state.selectedValue)
    if (e.target.value === "true"){
      this.setState({
        newAnimalSelect: true
      })
    }
    console.log("new selected value: ", this.state.selectedValue)
  }
  componentDidMount() {
      console.log("I mounted")
      console.log("setting all sightings in Database")
      this._setAllSightingsInDatabase();
      api.getAnimals()
      .then( (animals) => {
        console.log("animals received from api", animals)
        var options = animals.data.map( (animal) => {
        console.log(animal)
        var option = Object.assign({}, {value: animal.id, label: animal.name} )
        console.log("This is individual option: ", option)
        return option
        })
        console.log("this is options after map", options)
        this.setState({
          animals: animals,
          options: options
        })
      })
      //get a list of animals from the server and place on state
      //
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

    // this function places a thumbnail sized image on the map instead of an icon
    }
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
    console.log("this: ", this)
    var ajaxOptions = []
    this.state.options.forEach( (option, index) => {
      console.log(option);
      ajaxOptions.push(<option key={index} value={option.value}>{option.label}</option>)
    })
    console.log("ajax options after map: ", ajaxOptions)
    // console.log(<select>)
    return (
        <div>
          <div ref="map" style={styles.map}></div>
          <div>
            <label>Lat<input value={this.state.lat} type="text" onChange={this._updateCoordinatesLat} />
            </label>{this.state.lat}
            <br />
            <label>Long<input value={this.state.long} type="text" onChange={this._updateCoordinatesLong} />
            </label>{this.state.long}
            <br />
            <label>coordinates</label>
            <input type="text" value={this.state.coordinates} onChange={this._updateCoordinates} />{this.state.coordinates}
            <br />
            <select value={this.state.selectedValue} onChange={this._selectHandler}>
              <option value="select">Select an animal</option>
              {ajaxOptions}
              <option value={true}>Select to add new animal</option>
            </select>
            <br />
            {this.state.newAnimalSelect &&
              <div>
                <label>Enter new animal</label>
                <input type="text" onChange={this._updateAnimal} />
                <br />
                Animal: {this.state.animal}
                <br />
                SelectedValue: {this.state.selectedValue}
                <br />
              </div>
            }
            <label>Upload Picture</label>
            <input type="file" onChange={this._submitPicture.bind(this)} />

            <br />
            {this.state.uploading && <div style={styles.background} className="ui active text loader">Loading</div>}


            imagePath: {this.state.imagePath}
            <br />
            <button onClick={this._submitSighting.bind(this)}>SubmitSighting</button>
            <br />
            <hr />
            newAnimal:{this.state.newAnimal}
            <br />
            selectedValue: {this.state.selectedValue}
            <br />
            newanimalSelect: {this.state.newanimalSelect}
            <br />
            newAnimalID: {this.state.newAnimalID}
            <br />


          </div>
        </div>
    )
  }
};


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


// need to replace this with a function that calls the setImageMarker function for each sighting
    // var coordinates = new google.maps.LatLng(40.7687269, -74.0008466);
    // var animal = "Humpback Whale";
    // var imagePath = "http://i.huffpost.com/gen/1527948/thumbs/o-HUMPBACK-WHALE-HAWAII-900.jpg?1";

    // this sets a specific marker, need to pass this function basically every image we want to display, and can use this to refilter the data, maybe filter is another function that returns filtered data and is run through this function again?
    // this.setImageMarker(coordinates, animal, imagePath);
  // }
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