var router = require('express').Router();
var mongoose = require('mongoose');

var Sighting = mongoose.model('Sighting');

router.get('/', function (req, res, next) {
	Sighting.find()
		.then(function (sightings) {
			res.send(sightings);
		}, next)
})
