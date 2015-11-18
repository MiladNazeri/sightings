var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../../../webpack.config.js');
var express = require('express');

const compiler = webpack(config);

module.exports = function (app) {

    app.use(express.static(__dirname + '/03_dist'));
    app.use(webpackMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
    app.get('/*', function response(req, res) {
      res.sendFile(path.join(__dirname, '03_dist/index.html'));
    });

}