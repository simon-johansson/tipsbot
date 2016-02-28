#!/usr/bin/env node

'use strict';

/**
 * TipsBot launcher script.
 *
 * @author Simon Johansson <simon.johansson@screeninteraction.com>
 */

 require('babel-polyfill');
 require('babel-register')({
   presets: ['es2015', 'stage-0'],
   'plugins': [
     ['transform-decorators-legacy'],
   ]
 });

var bot = require('./bot').create();
bot.run();
