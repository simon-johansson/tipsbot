
import { existsSync } from 'fs';
import { resolve } from 'path';
import TipsBot from '../lib/tipsbot';

const tokenPath = resolve(__dirname, '..', 'token.js');
const defaultToken = existsSync(tokenPath) ? require('../token') : null;
const defaultName = 'Tipsbot';
const defaultTips = resolve(__dirname, '..', 'data', 'pragmatic-programmer.json');
const defaultChannel = 'general';
const defaultSchedule = '0 9 * * 1,2,3,4,5'; // 09:00 on monday-friday
const defaultStartIndex = 0;

export const create = () =>
  new TipsBot({
    token: process.env.BOT_API_KEY || defaultToken,
    name: process.env.BOT_NAME || defaultName,
    filePath: process.env.BOT_FILE_PATH || defaultTips,
    channel: process.env.BOT_CHANNEL || defaultChannel,
    schedule: process.env.BOT_SCHEDULE || defaultSchedule,
    startIndex: process.env.BOT_START_INDEX || defaultStartIndex,
  });
