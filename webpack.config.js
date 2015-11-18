module.exports = {
     entry: "./02_src/js/main.js",
     output: {
          path: '/03_dist',
          filename: "bundle.js",
          publicPath: '/'
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