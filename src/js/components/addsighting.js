import React from 'react';
import auth from "../utils/auth.js";
import axios from 'axios';
import api from '../api/api.js';

export default class AddSighting extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			lat: "",
			long: "",
			coordinates: "",
			animal: "",
			newAnimal: "",
			allAnimals: [],
			allAnimalsSelect: [],
			newAnimalSelect: false,
			newAnimalID: "",
			selectedValue: "select",
			selectedFilterValue: "select",
			imagePath: "",
			uploading: false,
			uploaded: true,
			file: "",
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
		this._matchIdWithName = this._matchIdWithName.bind(this);
		this._getAnimalsForSelect = this._getAnimalsForSelect.bind(this);
		this._selectFilterHandler = this._selectFilterHandler.bind(this);
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
	  _updateImg(){
	    var path = `https://mobyclick.s3-us-west-2.amazonaws.com/${this.state.filename}`
	    this.setState({
	        imagePath: path
	    })
	  }
	  _updateValue(e){
	    this.setState({
	      selectedValue: e
	    })
	  }
	  _selectHandler(e){
	    this.setState({
	      selectedValue: e.target.value,
	      newAnimalSelect: false
	    })
	    if (e.target.value === "true"){
	      this.setState({
	        newAnimalSelect: true
	      })
	    }
	  }
	  _getAnimalsForSelect(){
	    api.getAnimals()
	    .then( (animals) => {
	      var options = animals.data.map( (animal) => {
	      var option = Object.assign({}, {value: animal.id, label: animal.name} )
	      return option
	      })
	      this.setState({
	        allAnimals: animals,
	        allAnimalsSelect: options
	      })
	    })
	  }
	    _selectFilterHandler(e){
	    this.setState({
	      selectedFilterValue: e.target.value
	    })
	    }
	    _matchIdWithName(id){
	      for (var i = 0; i < this.state.options.length; i++){
	        if(this.state.options[i].value === id) {
	          return this.state.options[i].label
	        }
		  }
		}

	   _submitSighting() {
	     var animalIDForSightingObject = "replace"
	     var coordinates = new google.maps.LatLng(this.state.lat, this.state.long);
	     if (this.state.newAnimalSelect && this.state.animal){
	       api.createAnimal({name: this.state.animal})
	       .then( (newAnimalID) => {
	         this.setState({
	           newAnimalID: newAnimalID.data.id
	         })
	       }).then( () => {
	         animalIDForSightingObject = this.state.newAnimalID;
	         this._getAnimalsForSelect();
	       }).then( () => {
	         var imagePath = this.state.imagePath;
	         var sighting = {
	           animal: animalIDForSightingObject,
	           location: [this.state.lat, this.state.long],
	           mediaFull: imagePath,
	           userId: auth.getToken()
	         }
	         api.createSighting(sighting)
	         .then( (results) => {
	           this.context.history.replaceState(null, '/mapView')
	         })
	       })
	     }
	     if (!this.state.newAnimalSelect && this.state.selectedValue){
	         animalIDForSightingObject = this.state.selectedValue
	         var imagePath = this.state.imagePath;
	         var sighting = {
	           animal: animalIDForSightingObject,
	           location: [this.state.lat, this.state.long],
	           mediaFull: imagePath,
	           userId: auth.getToken()
	         }
	         api.createSighting(sighting)
	         .then( (results) => {
	           this.context.history.replaceState(null, '/mapView')
	         })
	    }
	  }
	  _submitPicture(e){
		  var file = e.target.files[0];
		  var filename = file.name;
		  var filetype = file.type;

		  this.setState({
		      filename: filename,
		      filetype: filetype,
		      file: file,
		      uploading: true
		  })

		  axios.post('/api/s3/sign_s3', {
		      filename: filename,
		      filetype: filetype
		  })

		  .then( (result) => {
		      var signedUrl = result.data;
		      return axios.put(signedUrl, this.state.file)
		  })
		  .then( (results) => {
		      this.setState({
		      uploading: false,
		      uploaded:true
		      })
		      this._updateImg()
		    })
	  }
	  componentWillMount(){
	 	this._getAnimalsForSelect()
	  }

	render() {
		var animalOptions = [];
		this.state.allAnimalsSelect.forEach( (option, index) => {
		  animalOptions.push(<option key={index} value={option.value}>{option.label}</option>)
		})

		return (
			<div>
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
				    {animalOptions}
				    <option value={true}>Select to add new animal</option>
				  </select>
				  <br />
				  {this.state.newAnimalSelect &&
				    <div>
				      <label>Enter new animal</label>
				      <input type="text" onChange={this._updateAnimal} />
				    </div>
				  }
				  <label>Upload Picture</label>
				  <input type="file" onChange={this._submitPicture.bind(this)} />

				  <br />
				  {this.state.uploading && <div style={styles.background} className="ui active text loader">Loading</div>}


				  <br />
				  <button onClick={this._submitSighting.bind(this)}>SubmitSighting</button>
				  <br />
				  <hr />
				  <br />
				</div>
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

AddSighting.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
}

