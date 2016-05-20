'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var _ = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the Madadata\'s ' + chalk.red('generator-md-react-base') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'project',
        message: 'What\'s the name of your project',
        default: this.appname
      },
      {
        type: 'input',
        name: 'author',
        message: 'Waht\'s the name of author',
        default: ''
      }
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  configuring: function () {
    var configFilesForCopy = [
      'LICENSE',
      '.babelrc',
      '.gitignore',
      '.eslintrc',
      'devServer.js',
      'webpack.config.common.js',
      'webpack.config.dev.js',
      'webpack.config.prod.js'
    ];
    // config files for
    _.forEach(configFilesForCopy, function(file) {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      );
    }.bind(this));

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        author: this.props.author,
        project: this.props.project
      }
    );
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html'),
      { project: this.props.project }
    );

    // copy start files
    this.fs.copy(
      this.templatePath('src/**'),
      this.destinationPath('src/')
    );
    this.fs.copy(
      this.templatePath('test/**'),
      this.destinationPath('test/')
    );
  },

  install: function () {
    // install the default dependencies
    this.npmInstall([
      // node basis
      'express',
      'helmet',
      'immutable',
      'morgan',
      // react-related
      'react',
      'react-dom',

      'redux',
      'react-redux',
      'redux-logger',
      'redux-saga',

      'react-router',
      'react-router-redux',
      // utilities
      'lodash',
      'commitizen',
      'cz-conventional-changelog',
      'normalize.css'

    ], { 'save': true });

    // install the default devDependencies
    this.npmInstall([
      // es6 transpile
      'babel-core',
      'babel-loader',
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-stage-0',
      // lint-related
      'eslint',
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-react',
      'eslint-plugin-jsx-a11y',
      // webpack-related
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware',
      'babel-loader',
      'style-loader',
      'eslint-loader',
      'json-loader',
      'file-loader',
      'css-loader',
      'url-loader',
      // test-related
      'mocha',
      'expect',
      'jsdom',
      'ignore-styles',
      // styles-related
      'precss',
      'postcss',
      'postcss-import',
      'postcss-loader',
      'autoprefixer',
      'cssnano',
      'lost'
    ], { 'saveDev': true });
  }
});
