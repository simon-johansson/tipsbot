
import 'babel-polyfill';

import { existsSync } from 'fs';
import { resolve } from 'path';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const { expect } = chai;
chai.use(sinonChai);

import data from '../data/pragmatic-programmer';

import Tipsbot from '../src/bot/Tipsbot';
import { create as createBot } from '../src/bot';

sinon.stub(Tipsbot.prototype, 'login', () =>  false);
sinon.stub(Tipsbot.prototype, 'run', () => false);

const resetEnvironmentVariables = () => {
  process.env['BOT_API_KEY'] = 'token';
  process.env['BOT_NAME'] = '';
  process.env['BOT_FILE_PATH'] = '';
  process.env['BOT_CHANNEL'] = '';
  process.env['BOT_SCHEDULE'] = '';
  process.env['BOT_START_INDEX'] = '';
  process.env['BOT_ICON_URL'] = '';
};

describe('Tipsbot', () => {
  let tipsbot;
  const token = 'token';

  describe('#constructor()', () => {

    it('takes settings object', () => {
      const tipsbot = createBot({
        token: 'token',
        name: 'name',
        filePath: 'path',
        channel: 'channel',
        startIndex: 0,
        schedule: 'schedule',
        iconURL: 'image.png',
        shouldNotExist: 'nope',
      });

      expect(tipsbot).to.have.property('token', 'token');
      expect(tipsbot).to.have.property('name', 'name');
      expect(tipsbot).to.have.property('filePath', 'path');
      expect(tipsbot).to.have.property('channel', 'channel');
      expect(tipsbot).to.have.property('tipIndex', 0);
      expect(tipsbot).to.have.property('iconURL', 'image.png');
      expect(tipsbot).to.have.property('schedule', 'schedule');

      expect(tipsbot).to.not.have.property('shouldNotExist');
    });
  });


  describe('JSON file', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      sandbox.stub(process, 'exit', () => false);
      sandbox.spy(console, 'log');
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('throw if JSON file does not exist', () => {
      const filePath = resolve(__dirname, 'file-does-not-exist.json');
      const bot = createBot({token, filePath});
      bot._loadTipsFile();

      expect(console.log).to.have.been.calledWithMatch('file-does-not-exist.json');
      expect(process.exit).to.have.been.calledOnce;
    });

    it('throw if JSON file follows wrong format', (done) => {
      const filePath = resolve(__dirname, 'invalid-format.json');
      const bot = createBot({token, filePath});
      bot._loadTipsFile();
      bot._validateTipsFormat().then(() => {
        expect(process.exit).to.have.been.calledOnce;
        expect(console.log).to.have.been.calledWithMatch('Invalid format of JSON file.');
        done();
      });
    });
  });

  describe('CRON', () => {
    it.skip('throw if CRON string is invalid', () => {

    });
  });

  describe('posting tips', () => {
    let sandbox;
    const testTips = require('./test-tips');
    const filePath = resolve(__dirname, 'test-tips.json');
    const createBotAndLoadJSON = startIndex => {
      const bot = createBot({token, filePath, startIndex});
      bot._loadTipsFile();
      return bot;
    }

    beforeEach(() => {
      resetEnvironmentVariables();

      sandbox = sinon.sandbox.create();
      sandbox.stub(Tipsbot.prototype, 'postMessageToChannel', () => false);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('post first tip in file if tips index is set to 0', () => {
      let bot = createBotAndLoadJSON();
      bot._postTip();
      expect(bot.postMessageToChannel).to.have.been.calledOnce;
      expect(bot.postMessageToChannel).to.have.been.calledWithMatch('general', testTips[0].details);
    });

    it('reset tip index when end of queue is reached', () => {
      let bot = createBotAndLoadJSON(testTips.length - 1);
      bot._postTip();
      expect(bot.postMessageToChannel).to.have.been.calledWithMatch('general', testTips[3].details);
      bot._postTip();
      expect(bot.postMessageToChannel).to.have.been.calledWithMatch('general', testTips[0].details);
    });
  });

  describe('default values', () => {
    beforeEach(() => resetEnvironmentVariables());

    it('name', () => {
      expect(createBot()).to.have.property('name', 'Tipsbot');
    });

    it('file path', () => {
      expect(existsSync(createBot().filePath)).to.be.true;
    });

    it('channel', () => {
      expect(createBot()).to.have.property('channel', 'general');
    });

    it('schedule', () => {
      expect(createBot()).to.have.property('schedule', '0 9 * * 1,2,3,4,5');
    });

    it('start index', () => {
      expect(createBot()).to.have.property('tipIndex', 0);
    });

    it('image url', () => {
      expect(createBot()).to.have.property('iconURL', '');
    });
  });

  describe('environment variables', () => {
    beforeEach(() => resetEnvironmentVariables());

    it('token', () => {
      const val = 'abc123';
      process.env['BOT_API_KEY'] = val;
      expect(createBot()).to.have.property('token', val);
    });

    it('name', () => {
      const val = 'simon';
      process.env['BOT_NAME'] = val;
      expect(createBot()).to.have.property('name', val);
    });

    it('file path', () => {
      const val = 'path/to/file';
      process.env['BOT_FILE_PATH'] = val;
      expect(createBot()).to.have.property('filePath', val);
    });

    it('channel', () => {
      const val = 'tips';
      process.env['BOT_CHANNEL'] = val;
      expect(createBot()).to.have.property('channel', val);
    });

    it('schedule', () => {
      const val = 'schedule';
      process.env['BOT_SCHEDULE'] = val;
      expect(createBot()).to.have.property('schedule', val);
    });

    it('start index', () => {
      const val = 10;
      process.env['BOT_START_INDEX'] = val;
      expect(createBot()).to.have.property('tipIndex', val);
    });

    it('image url', () => {
      const val = 'url.png';
      process.env['BOT_ICON_URL'] = val;
      expect(createBot()).to.have.property('iconURL', val);
    });
  });
});
