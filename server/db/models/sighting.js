'use strict';
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

var sightingSchema = new mongoose.Schema({

	location: {
		type: [Number],
		required: true
	},
	time: {
		type: Date,
		default: Date.now
	},
	address : {
		street: String,
		city: String,
		state: String,
		zipcode: String,
		country: String
	},
	notAppropriate: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		required: true
	},
	story: {
		type: String
	},
	photo: {
		type: String,
		required: true
	},
	mediaThumbnail: String,
	pending: {
		type: Boolean,
		default: true
	},
	proWhalePick: {
		type: String,
	},
	userWhalePick: {
		type: String,
	},
	proComment: {
		type: String
	},
	proApprove: {
		type: Boolean
	}




});

mongoose.model('Sighting', sightingSchema);