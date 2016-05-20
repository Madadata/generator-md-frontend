
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');
const common = require('./webpack.config.common');

module.exports = _.merge({}, common, {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src/index'),
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
});
