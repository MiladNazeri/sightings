'use strict';
var mongoose = require('mongoose');

var animalSchema = new mongoose.Schema({
	name: String
});

mongoose.model('Animal', animalSchema);