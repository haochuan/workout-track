'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var autoprefixer      = require('autoprefixer');
var precss            = require('precss');

module.exports = {
  entry: [
    path.join(__dirname, 'frontend/src/index.js')
  ],
output: {
    path: path.join(__dirname, '/frontend/build/'),
    filename: '[name]-[hash].min.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'frontend/src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    // common lib
    new webpack.ProvidePlugin({
      '_': 'lodash',
      'Promise': 'bluebird'
    }),
    // copy dependencies
    new CopyWebpackPlugin([
      { from: 'frontend/src/dependencies', to: 'dependencies' }
    ]),
    // new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    // preLoaders: [{
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint'
    // }],
    loaders: [
      // js/jsx 
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname
      },
      // json
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
        // loader:  ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
      },

    // less
    { 
      test: /\.less$/, 
      loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap' 
    },
    // sass
      { 
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }

    ]
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
};
