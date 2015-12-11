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
		required: true,
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
		type: String,
		default: true
	},
	proWhalePick: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Whale'
	},
	proComment: {
		type: String
	},
	proApprove: {
		type: Boolean
	}




});

mongoose.model('Sighting', sightingSchema);