module.exports = {
     entry: "./src/js/main",
     output: {
          path: '/public/',
          filename: "bundle.js",
          publicPath: '/public/'
     },
     module: {
          loaders: [
               {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                         presets: ['es2015', 'react']
                    }
               }
          ]
     }
};