module.exports = {
  entry: {
    lib: ['./lib/countdown.es6.js'],
    demo: './demo/app.js',
  },
  output: {
    path: __dirname,
    filename: '[name]/countdown.bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/,  exclude: /(node_modules|bower_components)/, loader: 'babel' },
    ],
  },
};
