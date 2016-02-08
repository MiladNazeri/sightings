var webpack = require('webpack');
var path = require('path');

module.exports = {
     entry: ["./src/js/main",
     'webpack-hot-middleware/client'
     ],
     output: {
          path: '/public/',
          filename: "bundle.js",
          publicPath: '/public/'
     },
     plugins: [
      new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
      ],
    module: {
      loaders: [{
          test: /\.(js|jsx|babel|json)$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot', 'babel', 'babel-loader'],
        }]
      },
};
