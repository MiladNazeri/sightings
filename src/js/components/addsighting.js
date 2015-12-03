import React from 'react';
import auth from "../utils/auth.js";
import axios from 'axios';
import api from '../api/api.js';

export default class AddSighting extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sightings: ""
		}
	}

	render() {
		return (
			<div>
				YO!
			</div>
		)
	}
}