var router = require('express').Router();
var mongoose = require('mongoose')// var Animal =
;
var Sighting = mongoose.model('Sighting');

router.get('/', function (req, res, next) {
	Sighting.find().populate('animal userId').exec()
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

router.put('/', function (req, res, next) {

	console.log("req.body", req.body)
	Sighting.findById(req.body._id)
	.then( (sighting) =>{
		console.log("sighting", sighting)
		// sighting.proWhalePick = req.body.sighting.proWhalePick;
		sighting.proComment = req.body.sighting.proComment;
		sighting.proApprove = req.body.sighting.proApprove;
		sighting.save()
		.then( (result) => {
			console.log("result of put", result)
			return res.send (result)
		}, next)
	})
})

router.get('/:id', function (req, res, next) {
	Sighting.findById(req.params.id).populate('animal user').exec()
		.then(function (sighting) {
			res.send(sighting);
		}, next)
})

module.exports = router;