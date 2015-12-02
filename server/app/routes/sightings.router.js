var router = require('express').Router();
var mongoose = require('mongoose');
var Sighting = mongoose.model('Sighting');

router.get('/', function (req, res, next) {
	Sighting.find()
		.then(function (sightings) {
			return res.send(sightings);
		}, next);
});

router.post('/', function (req, res, next) {
	req.body.time = Date.now();
	Sighting.create(req.body)
		.then(function (result) {
			return res.send(result);
		}, next);
})

router.get('/:id', function (req, res, next) {
	Sighting.findById(req.params.id)
		.then(function (sighting) {
			res.send(sighting);
		}, next)
})

module.exports = router;