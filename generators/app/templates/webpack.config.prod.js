
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const common = require('./webpack.config.common');

module.exports = _.merge({}, common, {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, 'src/index'),
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
});
