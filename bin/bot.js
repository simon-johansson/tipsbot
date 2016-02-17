#!/usr/bin/env node

'use strict';

/**
 * TipsBot launcher script.
 *
 * @author Simon Johansson <simon.johansson@screeninteraction.com>
 */

 require('babel-register')({
   presets: ['es2015', 'stage-0']
 });

var resolve = require('path').resolve;
var TipsBot = require('../lib/tipsbot').default;

var token = process.env.BOT_API_KEY || require('../token');
var filePath = process.env.BOT_FILE_PATH ||
               resolve(__dirname, '..', 'data', 'pragmatic-programmer.json');
var name = process.env.BOT_NAME || 'Tipsbot';
var channel = process.env.BOT_CHANNEL || 'test';
var startIndex = process.env.BOT_START_INDEX || 0;

var tipsbot = new TipsBot({
  token: token,
  filePath: filePath,
  name: name,
  channel: channel,
  startIndex: startIndex
});

tipsbot.run();
