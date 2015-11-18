var router = require('express').Router();
var mongoose = require('mongoose');

router.post('/', function (req, res, next) {
	User.create(req.body)
		.then(function (result) {
			res.send(result)
		})
		.then(null, next);
})

router.get('/:id', function (req, res, next) {
	User.findById(req.params.id)
		.then(function (user) {
			res.send(user);
		}, next)
})
