var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function (req, res, next) {
	User.create(req.body)
		.then(function (result) {
            return res.send(result)
        }, next)
});


router.get('/:id', function (req, res, next) {
	User.findById(req.params.id)
		.then(function (user) {
			res.send(user);
		}, next)
})

module.exports = router;