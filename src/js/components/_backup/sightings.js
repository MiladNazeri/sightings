import React from 'react';
import auth from "../utils/auth.js";
import axios from 'axios';
import api from '../api/api.js';

export default class Sightings extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sightings: ""
		}
	}

	componentDidMount() {
	  api.getSightings()
      .then( (res) => {
      this.setState({
        sightings: res.data
      })
      var sightingsList = this.state.sightings.map( (sighting, index) => {
          return (<span key={index} style={styles.sightings}>
              <img style={styles.img} src={sighting.mediaFull} />
              <p>Animal: {sighting.animal.name}
              Location: {sighting.location}
              Time: {sighting.time}</p>
          </span>)
      })
      this.setState({
        sightingsList: sightingsList
      })
  	})
	}

	render() {
        console.log(this.state.sightings)

		return (
			<div>
				<div>
                {this.state.sightingsList}
				</div>
			</div>
		)
	}
}



var styles={
    img:{
        display: "inline",
        width: "auto",
        height: "250px",
    }
}