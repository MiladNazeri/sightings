var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/', function (req, res, next) {
	Animal.find()
		.then(function (animals) {
			res.send(animals);
		}, next)
})
