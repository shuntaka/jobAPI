var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: path.join(__dirname, '/jobAPI.js'),
  target: 'node',
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
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'jobAPIBundle.js',
  },
  externals: [nodeExternals()]
};
