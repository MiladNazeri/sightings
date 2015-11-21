var webpack = require('webpack');

module.exports = {
     entry: "./src/js/main",
     output: {
          path: '/public/',
          filename: "bundle.js",
          publicPath: '/public/'
     },
     plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [{
          test: /\.(js|jsx|babel)$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ['react-hot', 'babel'],
        }]
      }
    //  module: {
    //       loaders: [
    //            {
    //                 test: /\.jsx?$/,
    //                 exclude: /(node_modules|bower_components)/,
    //                 loader: 'babel',
    //                 query: {
    //                      presets: ['es2015', 'react']
    //                 }
    //            }
    //       ]
    //  }
};
