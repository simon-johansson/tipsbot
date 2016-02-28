
import 'babel-polyfill';

import { existsSync } from 'fs';
import { resolve } from 'path';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const { expect } = chai;
chai.use(sinonChai);

import Tipsbot from '../src/tipsbot';
import * as bin from '../bin/bot';

sinon.stub(Tipsbot.prototype, 'login', () =>  false);
sinon.stub(Tipsbot.prototype, 'run', () => false);
// sinon.stub(process, 'exit', () => false);

describe('Tipsbot', () => {
  let tipsbot;

  describe('#constructor()', () => {

    it('takes settings object', () => {
      const tipsbot = new Tipsbot({
        token: 'token',
        name: 'name',
        filePath: 'path',
        channel: 'channel',
        startIndex: 0,
        schedule: 'schedule',
        shouldNotExist: 'nope',
      });

      expect(tipsbot).to.have.property('token', 'token');
      expect(tipsbot).to.have.property('name', 'name');
      expect(tipsbot).to.have.property('filePath', 'path');
      expect(tipsbot).to.have.property('channel', 'channel');
      expect(tipsbot).to.have.property('tipIndex', 0);
      expect(tipsbot).to.have.property('schedule', 'schedule');

      expect(tipsbot).to.not.have.property('shouldNotExist');
    });

    it('requires "token" in settings object', () => {
      expect(() => new Tipsbot()).to.throw(Error);
      expect(() => new Tipsbot({token: 'token'})).to.not.throw(Error);
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
      const token = 'token';
      const filePath = resolve(__dirname, 'file-does-not-exist.json');
      const bot = new Tipsbot({token, filePath});
      bot._loadTipsFile();

      expect(console.log).to.have.been.calledWithMatch('file-does-not-exist.json');
      expect(process.exit).to.have.been.calledOnce;
    });

    it('throw if JSON file follows wrong format', () => {});
  });

  describe('schedule', () => {});

  describe('post tips', () => {
    it('post first tip', () => {});
    it('reset tip index when end of queue is reached', () => {});
    it('set tip index with env variable', () => {});
  });

  describe('CLI', () => {
    const resetEnvironmentVariables = () => {
      process.env['BOT_API_KEY'] = 'token';
      process.env['BOT_NAME'] = '';
      process.env['BOT_FILE_PATH'] = '';
      process.env['BOT_CHANNEL'] = '';
      process.env['BOT_SCHEDULE'] = '';
      process.env['BOT_START_INDEX'] = '';
    };

    describe('default values', () => {
      beforeEach(() => {
        resetEnvironmentVariables();
      });

      it('name', () => {
        expect(bin.create()).to.have.property('name', 'Tipsbot');
      });

      it('file path', () => {
        expect(existsSync(bin.create().filePath)).to.be.true;
      });

      it('channel', () => {
        expect(bin.create()).to.have.property('channel', 'general');
      });

      it('schedule', () => {
        expect(bin.create()).to.have.property('schedule', '0 9 * * 1,2,3,4,5');
      });

      it('start index', () => {
        expect(bin.create()).to.have.property('tipIndex', 0);
      });
    });

    describe('environment variables', () => {
      beforeEach(() => {
        resetEnvironmentVariables();
      });

      it('token', () => {
        const val = 'abc123';
        process.env['BOT_API_KEY'] = val;
        expect(bin.create()).to.have.property('token', val);
      });

      it('name', () => {
        const val = 'simon';
        process.env['BOT_NAME'] = val;
        expect(bin.create()).to.have.property('name', val);
      });

      it('file path', () => {
        const val = 'path/to/file';
        process.env['BOT_FILE_PATH'] = val;
        expect(bin.create()).to.have.property('filePath', val);
      });

      it('channel', () => {
        const val = 'tips';
        process.env['BOT_CHANNEL'] = val;
        expect(bin.create()).to.have.property('channel', val);
      });

      it('schedule', () => {
        const val = 'schedule';
        process.env['BOT_SCHEDULE'] = val;
        expect(bin.create()).to.have.property('schedule', val);
      });

      it('start index', () => {
        const val = 10;
        process.env['BOT_START_INDEX'] = val;
        expect(bin.create()).to.have.property('tipIndex', val);
      });
    });
  });
});
