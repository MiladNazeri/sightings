'use strict';
var router = require('express').Router();

router.use('/animals', require('./animals.router.js'));
router.use('/sightings', require('./sightings.router.js'));
router.use('/users', require('./users.router.js'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
