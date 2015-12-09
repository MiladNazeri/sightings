'use strict';
var chalk = require('chalk');
var mongoose = require('mongoose');
var Promise = require('bluebird');


// Requires in ./db/index.js -- which returns a promise that represents
// mongoose establishing a connection to a MongoDB database.
var startDb = require('./db');
var Whale = Promise.promisifyAll(mongoose.model('Whale'));
// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    var app = require('./app');
    server.on('request', app); // Attach the Express application.
};

var seedWhale = function () {

    var whaleData = require('./db/whaleData.js')
    return Whale.createAsync(whaleData);
}

var createSeed = function () {

    Whale.findAsync({}).then(function(whales) {
        console.log("whales")
        if (whales.length === 0) {
            return seedWhale();
        } else {
            console.log("HA ALREADY DATA BITCH")
        }
    })
}

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

startDb.then(createApplication).then(startServer).then(createSeed).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});
