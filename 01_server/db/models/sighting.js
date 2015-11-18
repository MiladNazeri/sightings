'use strict';
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

var sightingSchema = new mongoose.Schema({

	animal: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Animal'
	},
	location: {
		type: [Number]
	},
	time: {
		type: Date
	},

	mediaFull: String,
	
	mediaThumbnail: String

});

mongoose.model('Sighting', sightingSchema);