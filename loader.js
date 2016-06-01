require('babel-core/register')
require('babel-polyfill')
require('./index')

var _ = require('lodash')

var faker = require('faker')

global._ = _

global.faker = faker
