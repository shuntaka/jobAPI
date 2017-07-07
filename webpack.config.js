var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.join(__dirname, '/jobProducer.js'),
  target: 'node',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'jobProducerBundle.js',
    libraryTarget: 'commonjs',
  },
  externals: [
    /^(?!\.|\/).+/i,
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  // plugins: [
  //   new webpack.IgnorePlugin(/vertx/),
  // ],
};
