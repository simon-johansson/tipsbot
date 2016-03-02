
import { resolve } from 'path';
import Bot from 'slackbots';

import formatValidator from '../format-validator';

import {
  cronValidator,
  cronPrettyPrint,
  cronJob
} from '../cron-helpers'

import {
  exit,
  print,
  singleLineString
} from '../utils';

export default class TipsBot extends Bot {
  constructor(settings) {
    super(settings);

    this.settings = settings;
    this.filePath = settings.filePath;
    this.channel = settings.channel;
    this.schedule = settings.schedule;
    this.iconURL = settings.iconURL;
    this.tipIndex = parseInt(settings.startIndex);

    this.tips = null;
  }

  run() {
    this.on('start', this._onStart);
  }

  async _onStart() {
    this._loadTipsFile();
    await this._validateTipsFormat();
    await this._validateCronFormat();
    await this._validateChannelExists();
    await this._startScheduler();
    this._startMessage();
  }

  _loadTipsFile() {
    try {
      this.tips = require(this.filePath);
    } catch (err) {
      this._invalidFilePath();
    }
  }

  _validateTipsFormat() {
    return formatValidator(this.tips)
            .catch(err => this._invalidFormatError(err));
  }

  _validateCronFormat() {
    return cronValidator(this.schedule)
            .catch(err => this._invalidCronFormat(err));
  }

  _validateChannelExists() {
    return this.getChannel(this.channel)
            .then(data => !data.name ? this._invalidChannel() : void(0));
  }

  _startScheduler() {
    return cronJob(this.schedule, ::this._postTip);
  }

  _postTip() {
    const tip = this._getNextTip();
    this._postMessage(tip);
  }

  _getNextTip() {
    if (this.tipIndex >= this.tips.length) this.tipIndex = 0;
    return this._formatTipsMessage(this.tips[this.tipIndex++]);
  }

  _formatTipsMessage(tip) {
    return `*${tip.heading}*\n${tip.details}`;
  }

  _postMessage(msg) {
    this.postMessageToChannel(this.channel, singleLineString`${msg}`, {icon_url: this.iconURL});
  }

  @print
  _startMessage() {
    const { name, channel, team } = this;
    const date = new Date().toString();
    const cron = cronPrettyPrint(this.schedule);

    this._postMessage(`
      Hi, I am *${name}*! I will post tips in this channel ${cron}. Hope you'll find them useful.
    `);

    return `
      ${date} - Bot is now running!
      Will post tips to team '${team.name}' on channel '#${channel}' ${cron}.
      Take a look at your Slack channel, you should have gotten a welcome message from ${name}.
    `;
  }

  @exit @print
  _invalidFilePath(err) {
    return `File path "${this.filePath}" does not exists or it\'s not readable.`;
  }

  @exit @print
  _invalidCronFormat(err) {
    return 'Invalid cron format supplied.';
  }

  @exit @print
  _invalidFormatError(err) {
    return `
      Invalid format of JSON file.
      It has to be an array containing objects with the following structure:
      { heading: '<STRING>', details: '<STRING>' }
    `;
  }

  @exit @print
  _invalidChannel(err) {
    return `
      Invalid channel supplied.
      The channel '${this.channel}' does not exist on team '${this.team.name}'.
    `;
  }
}
