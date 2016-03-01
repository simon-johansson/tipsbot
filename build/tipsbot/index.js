'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

require('babel-polyfill');

var _fs = require('fs');

var _path = require('path');

var _Tipsbot = require('Tipsbot');

var _Tipsbot2 = _interopRequireDefault(_Tipsbot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Flytta filen till src som index

var tokenPath = (0, _path.resolve)(__dirname, '..', 'token.js');
var defaultToken = (0, _fs.existsSync)(tokenPath) ? require('../../token') : null;
var defaultName = 'Tipsbot';
var defaultTips = (0, _path.resolve)(__dirname, '..', '..', 'data', 'pragmatic-programmer.json');
var defaultChannel = 'general';
var defaultSchedule = '0 9 * * 1,2,3,4,5'; // 09:00 on monday-friday
var defaultStartIndex = 0;

// Gör det möjligt att stoppa in ett settings objekt

var create = exports.create = function create() {
  return new _Tipsbot2.default({
    token: process.env.BOT_API_KEY || defaultToken,
    name: process.env.BOT_NAME || defaultName,
    filePath: process.env.BOT_FILE_PATH || defaultTips,
    channel: process.env.BOT_CHANNEL || defaultChannel,
    schedule: process.env.BOT_SCHEDULE || defaultSchedule,
    startIndex: process.env.BOT_START_INDEX || defaultStartIndex
  });
};