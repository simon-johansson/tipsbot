#!/usr/bin/env node

'use strict';

/**
 * Tipsbot launcher script.
 *
 * @author Simon Johansson <simon.johansson@screeninteraction.com>
 */

require('babel-polyfill');
require('./bot').create().run();
