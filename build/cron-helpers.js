'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cronJob = exports.cronValidator = exports.cronPrettyPrint = undefined;

var _cronParser = require('cron-parser');

var _cronParser2 = _interopRequireDefault(_cronParser);

var _prettycron = require('prettycron');

var _prettycron2 = _interopRequireDefault(_prettycron);

var _nodeSchedule = require('node-schedule');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cronPrettyPrint = exports.cronPrettyPrint = function cronPrettyPrint(cronTime) {
  return _prettycron2.default.toString(cronTime).toLowerCase();
};

var cronValidator = exports.cronValidator = function cronValidator(cronTime) {
  return (0, _utils.promiseWrapper)(_cronParser2.default.parseExpression, cronTime);
};

var cronJob = exports.cronJob = function cronJob(cronTime, task) {
  return (0, _utils.promiseWrapper)(_nodeSchedule.scheduleJob, cronTime, task);
};