'use strict';

var path = require('path'),
    _ = require('lodash');

var env = process.env.NODE_ENV || 'development';
env = env.toLowerCase();

var all = {
    env: process.env.NODE_ENV,
    root: path.normalize(__dirname + '/../..'),
    port: 4200,

};
module.exports = _.merge(all, require('./' + env + '.js') || {});
