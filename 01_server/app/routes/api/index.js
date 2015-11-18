'use strict';
var router = require('express').Router();
module.exports = router;

// var ensureAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };

// router.get('/', ensureAuthenticated, function (req, res, next) {

// });
router.use('/animals', require('./api/animals.router.js'));
router.use('/sightings', require('./api/sightings.router.js'));
router.use('/users', require('./api/users.router.js'));

router.get('/', function (req, res, next) {

});