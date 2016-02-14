
import { resolve } from 'path';
import Bot from 'slackbots';
import schedule from 'node-schedule';

import tips from '../data/pragmatic-programmer';

export default class TipsBot extends Bot {
  constructor(settings) {
    super(settings);

    this.settings = settings;
    this.filePath = settings.filePath ||
                    resolve(__dirname, '..', 'data', 'pragmatic-programmer.json');
    this.channel = settings.channel;
    this.tipIndex = settings.startIndex;

    this.user = null;
    this.schedule = {
      dayOfWeek: [1, 2, 3, 4, 5], // 0 = Sunday
      hour: 9, // 24 h
      minute: 0,
    };
  }

  run() {
    this.on('start', this._onStart);
  }

  _onStart() {
    this._loadTips();
    this._loadBotUser();
    this._startScheduler();
  }

  _loadTips() {
    try {
      this.tips = require(this.filePath);
      // Check format of file
    } catch (err) {
      console.error(`File path "${this.filePath}" does not exists or it\'s not readable.`);
      process.exit(1);
    }
  }

  _loadBotUser() {
    const self = this;
    this.user = this.users.filter(user => user.name === self.name)[0];
  }

  _startScheduler() {
    schedule.scheduleJob(this.schedule, this._postTip);
  }

  _postTip() {
    const tip = this._getNextTip();
    this.postMessageToChannel(this.channel, `*${tip.heading}*\n${tip.details}`);
  }

  _getNextTip() {
    this.tipIndex = this.tipIndex >= tips.length - 1 ? 0 : this.tipIndex++;
    return tips[this.tipIndex];
  }
}
