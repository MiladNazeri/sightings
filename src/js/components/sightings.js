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

	componentWillMount() {
	  api.getSightings()
    .then( (res) => {
      this.setState({
        sightings: res.data
      })
  	})
	}

  _getAllSightings(){
  }


	render() {
		console.log(this.state.sightings[0]);
		return (
			<div>
				<div>
					Animal {this.state.sightings[0]}
					{this.state.sightings.mediaFull}
				</div>
			</div>
		)
	}
}