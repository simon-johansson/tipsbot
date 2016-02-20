
import { expect } from 'chai';
import sinon from 'sinon';

import Tipsbot from '../lib/tipsbot';
import bin from '../bin/bot';

sinon.stub(Tipsbot.prototype, 'login', () => { return false; });
sinon.stub(Tipsbot.prototype, 'run', () => { return false; });

describe('Tipsbot', () => {
  let tipsbot;

  describe('#constructor()', () => {
    beforeEach(() => {});

    it('takes "token", "name", "filePath", "channel" & "startIndex" in settings object', () => {
      const tipsbot = new Tipsbot({
        token: 'token',
        name: 'name',
        filePath: 'path',
        channel: 'channel',
        startIndex: 'index'
      });

      expect(tipsbot).to.have.property('token', 'token');
      expect(tipsbot).to.have.property('name', 'name');
      expect(tipsbot).to.have.property('filePath', 'path');
      expect(tipsbot).to.have.property('channel', 'channel');
      expect(tipsbot).to.have.property('tipIndex', 'index');
    });

    it('requires "token" in settings object', () => {
      expect(() => new Tipsbot()).to.throw(Error);
      expect(() => new Tipsbot({token: 'token'})).to.not.throw(Error);
    });
  });

  describe('environment variables', () => {});

  describe('tips JSON file', () => {
    it('throw if JSON file does not exist', () => {});
    it('throw if JSON file follows wrong format', () => {});
    it('', () => {});
  });

  describe('post schedule', () => {});

  describe('post tips', () => {
    it('post first tip', () => {});
    it('reset tip index when end of queue is reached', () => {});
    it('set tip index with env variable', () => {});
  });
});
