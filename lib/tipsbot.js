
import { resolve } from 'path';
import { scheduleJob } from 'node-schedule';
import Bot from 'slackbots';
import validator from 'node-validator';
import cronParser from 'cron-parser';
import cronPrinter from 'prettycron';

import tips from '../data/pragmatic-programmer';

export default class TipsBot extends Bot {
  constructor(settings) {
    super(settings);

    this.settings = settings;
    this.filePath = settings.filePath;
    this.channel = settings.channel;
    this.tipIndex = settings.startIndex;

    this.user = null;
    this.tips = null;

    // Should come from env variable
    this.schedule = '0 9 * * 1,2,3,4,5';
  }

  run() {
    this.on('start', this._onStart);
  }

  _onStart() {
    this._loadTipsFile();
    this._validateTipsFormat();
    this._validateChannelExists()
      .then(::this._validateCronFormat)
      .then(::this._startScheduler)
      .then(::this._printStartMessage);
  }

  _loadTipsFile() {
    try {
      this.tips = require(this.filePath);
    } catch (err) {
      this._exitWithRequireError();
    }
  }

  _validateTipsFormat() {
    const checkChildren = validator.isObject()
      .withRequired('heading', validator.isString())
      .withRequired('details', validator.isString());

    const check = validator.isArray(checkChildren);

    validator.run(check, this.tips, (errorCount, errors) => {
      if (errorCount) this._exitWithInvalidFormatError(errors);
    });
  }

  _validateChannelExists() {
    return this.getChannel(this.channel)
            .then(data => data.name ? data : this._exitWithInvalidChannel());
  }

  _validateCronFormat() {
    try {
      cronParser.parseExpression(this.schedule);
    } catch (err) {
      this._exitWithInvalidCronFormat(err);
    }
  }

  _startScheduler() {
    return scheduleJob(this.schedule, ::this._postTip);
  }

  _postTip() {
    const tip = this._getNextTip();
    this.postMessageToChannel(this.channel, tip);
  }

  _getNextTip() {
    this.tipIndex = this.tipIndex >= tips.length - 1 ? 0 : this.tipIndex++;
    return this._formatTipsMessage(tips[this.tipIndex]);
  }

  _formatTipsMessage(tip) {
    return `*${tip.heading}*\n${tip.details}`;
  }

  _printStartMessage() {
    const cronFormated = cronPrinter.toString(this.schedule).toLowerCase();
    console.log(`Bot running! Will post tips to '#${this.channel}' ${cronFormated}`);
  }

  _exitWithRequireError() {
    console.error(`File path "${this.filePath}" does not exists or it\'s not readable.`);
    process.exit(1);
  }

  _exitWithInvalidCronFormat(err) {
    console.error(`Invalid cron format supplied: ${err.message}`);
    process.exit(1);
  }

  _exitWithInvalidFormatError(error) {
    console.error(`
      Invalid format of JSON file. Has to be an array containing object following this structure:
      { heading: '<STRING>', details: '<STRING>' }
    `);
    console.error(error);
    process.exit(1);
  }

  _exitWithInvalidChannel() {
    console.error(`Invalid channel supplied. The channel '${this.channel}' does not exist.`);
    process.exit(1);
  }
}
