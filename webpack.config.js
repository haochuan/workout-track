'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var precss            = require('precss');
var autoprefixer      = require('autoprefixer');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'frontend/src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/frontend/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    // new ExtractTextPlugin( "bundle.css" ),
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), 
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  eslint: {
    configFile: './.eslintrc'
  },
  module: {
    // preLoaders: [
  //     {
  //       test: /\.jsx?$/,
  //       loaders: ["eslint-loader"],
  //       exclude: [
  //        /node_modules/, 
  //        /src\/configureStore.js/,
  //        /src\/containers\/Root\/index.js/
  //       ]

  //     }
  //   ],
    loaders: [
      // js/jsx
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: __dirname,
        query: {
          plugins: [["import", { libraryName: "antd", style: "css" }]]
        }
      },
      // json
      {
        test: /\.json$/,
        loader: 'json'
      },
      // css
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
      // // font and svg
      // { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            // { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
      ] 
  },
  postcss: function () {
    return [precss, autoprefixer];
  }
}