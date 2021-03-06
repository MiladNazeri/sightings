var router = require('express').Router();
var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

router.get('/', function (req, res, next) {
	Animal.find()
		.then(function (animals) {
			res.send(animals);
		}, next);
})

router.post('/', function (req, res, next) {
	Animal.create(req.body)
		.then(function (result) {
			return res.send(result)
		}, next);
})

module.exports = router


