module.exports = {
  entry: {
    demo: './demo/app.js',
  },
  output: {
    path: __dirname,
    filename: '[name]/demo.bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
         query: {
           presets: ['es2015']
        }
      },
    ],
  },
};
