
import { expect } from 'chai';
import Tipsbot from '../lib/tipsbot'

describe('Tipsbot', () => {
  let tipsbot;

  describe('#constructor()', () => {
    beforeEach(() => {

    });

    it('requires token in settings object', () => {
      expect(() => new Tipsbot()).to.throw(Error);
      expect(() => new Tipsbot({token: 'token'})).to.not.throw(Error);
    });
  });

});
