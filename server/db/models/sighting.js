'use strict';
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

var sightingSchema = new mongoose.Schema({

	animal: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Animal',
		required: true
	},
	location: {
		type: [Number],
		required: true
	},
	time: {
		type: Date,
		required: true
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

	mediaFull: {
		type: String,
		required: true
	},

	mediaThumbnail: String,

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}



});

mongoose.model('Sighting', sightingSchema);