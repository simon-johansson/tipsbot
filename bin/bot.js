
var existsSync = require('fs').existsSync;
var resolve = require('path').resolve;
var TipsBot = require('../build/tipsbot').default;

var tokenPath = resolve(__dirname, '..', 'token.js');
var defaultToken = existsSync(tokenPath) ? require('../token') : null;
var defaultName = 'Tipsbot';
var defaultTips = resolve(__dirname, '..', 'data', 'pragmatic-programmer.json');
var defaultChannel = 'general';
var defaultSchedule = '0 9 * * 1,2,3,4,5'; // 09:00 on monday-friday
var defaultStartIndex = 0;

module.exports = {
  create: function () {
    return new TipsBot({
      token: process.env.BOT_API_KEY || defaultToken,
      name: process.env.BOT_NAME || defaultName,
      filePath: process.env.BOT_FILE_PATH || defaultTips,
      channel: process.env.BOT_CHANNEL || defaultChannel,
      schedule: process.env.BOT_SCHEDULE || defaultSchedule,
      startIndex: process.env.BOT_START_INDEX || defaultStartIndex,
    });
  }
}
