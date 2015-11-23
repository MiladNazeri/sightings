var webpack = require('webpack');
var path = require('path');

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
          // saving the "include" properties in case we need them later 
          //include: "/Users/Amit/Dropbox/Coding/FullStack/sightings/node_modules/react-googlemaps/src/ui/components/*.js",
          // include: [
          //   path.resolve(__dirname, 'server'),
          //   path.resolve(__dirname, 'src'),
          //   path.resolve(__dirname, 'tests'),
          //   path.resolve(__dirname, 'node_modules/react-googlemaps')
          // ],
          loaders: ['react-hot', 'babel', 'babel-loader'],
        }]
      },
      // saving this just in case we need it for some reason
      // resolveLoader: {
      //   moduleDirectories: [
      //     '/Users/Amit/dropbox/coding/fullstack/sightings/node_modules'
      //   ]
      // }
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
