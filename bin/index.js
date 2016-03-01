#!/usr/bin/env node

'use strict';

/**
 * Tipsbot launcher script.
 *
 * @author Simon Johansson <simon.johansson@screeninteraction.com>
 */

require('babel-polyfill');
require('../build/bot/index.js').create().run();
