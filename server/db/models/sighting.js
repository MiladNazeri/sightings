'use strict';
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

var sightingSchema = new mongoose.Schema({

	animal: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Animal'
	},
	location: {
		type: [Number],
		required: true
	},
	time: {
		type: Date,
		required: true
	},

	mediaFull: String,

	mediaThumbnail: String,

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}



});

mongoose.model('Sighting', sightingSchema);