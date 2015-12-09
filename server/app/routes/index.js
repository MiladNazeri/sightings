'use strict';
var router = require('express').Router();
var aws = require('aws-sdk');
var fs = require('fs')
//
//
//
router.use('/animals', require('./animals.router.js'));
router.use('/sightings', require('./sightings.router.js'));
router.use('/users', require('./users.router.js'));
router.use('/s3', require('./s3.router.js'));
router.use('/whales', require('./whales.router.js'));


    // Make sure this is after all of
    // the registered routes!
    router.use(function (req, res) {
        res.status(404).end();
    });

module.exports = router
