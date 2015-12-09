var router = require('express').Router();
var mongoose = require('mongoose');
var Whale = mongoose.model('Whale');

router.get('/', function (req, res, next) {
	Whale.find()
		.then(function (whales) {
			res.send(whales);
		}, next);
})

router.post('/', function (req, res, next) {
	Whale.create(req.body)
		.then(function (result) {
			return res.send(result)
		}, next);
})

module.exports = router


