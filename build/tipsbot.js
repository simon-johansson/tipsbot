'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _templateObject = _taggedTemplateLiteral(['\n      Hi, I am *', '*! I will post tips in this channel ', '. Hope you\'ll find them useful.\n    '], ['\n      Hi, I am *', '*! I will post tips in this channel ', '. Hope you\'ll find them useful.\n    ']);

var _path = require('path');

var _slackbots = require('slackbots');

var _slackbots2 = _interopRequireDefault(_slackbots);

var _formatValidator = require('./format-validator');

var _formatValidator2 = _interopRequireDefault(_formatValidator);

var _cronHelpers = require('./cron-helpers');

var _utils = require('./utils');

var _pragmaticProgrammer = require('../data/pragmatic-programmer');

var _pragmaticProgrammer2 = _interopRequireDefault(_pragmaticProgrammer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var TipsBot = (_class = function (_Bot) {
  _inherits(TipsBot, _Bot);

  function TipsBot(settings) {
    _classCallCheck(this, TipsBot);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TipsBot).call(this, settings));

    _this.settings = settings;
    _this.filePath = settings.filePath;
    _this.channel = settings.channel;
    _this.schedule = settings.schedule;
    _this.tipIndex = parseInt(settings.startIndex);

    _this.tips = null;
    return _this;
  }

  _createClass(TipsBot, [{
    key: 'run',
    value: function run() {
      this.on('start', this._onStart);
    }
  }, {
    key: '_onStart',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._loadTipsFile();
                _context.next = 3;
                return this._validateTipsFormat();

              case 3:
                _context.next = 5;
                return this._validateCronFormat();

              case 5:
                _context.next = 7;
                return this._validateChannelExists();

              case 7:
                _context.next = 9;
                return this._startScheduler();

              case 9:
                this._startMessage();

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function _onStart() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: '_loadTipsFile',
    value: function _loadTipsFile() {
      try {
        this.tips = require(this.filePath);
      } catch (err) {
        this._invalidFilePath();
      }
    }
  }, {
    key: '_validateTipsFormat',
    value: function _validateTipsFormat() {
      var _this2 = this;

      return (0, _formatValidator2.default)(this.tips).catch(function (err) {
        return _this2._invalidFormatError(err);
      });
    }
  }, {
    key: '_validateCronFormat',
    value: function _validateCronFormat() {
      var _this3 = this;

      return (0, _cronHelpers.cronValidator)(this.schedule).catch(function (err) {
        return _this3._invalidCronFormat(err);
      });
    }
  }, {
    key: '_validateChannelExists',
    value: function _validateChannelExists() {
      var _this4 = this;

      return this.getChannel(this.channel).then(function (data) {
        return !data.name ? _this4._invalidChannel() : void 0;
      });
    }
  }, {
    key: '_startScheduler',
    value: function _startScheduler() {
      return (0, _cronHelpers.cronJob)(this.schedule, this._postTip.bind(this));
    }
  }, {
    key: '_postTip',
    value: function _postTip() {
      var tip = this._getNextTip();
      this.postMessageToChannel(this.channel, tip);
    }
  }, {
    key: '_getNextTip',
    value: function _getNextTip() {
      this.tipIndex = this.tipIndex >= _pragmaticProgrammer2.default.length - 1 ? 0 : this.tipIndex++;
      return this._formatTipsMessage(_pragmaticProgrammer2.default[this.tipIndex]);
    }
  }, {
    key: '_formatTipsMessage',
    value: function _formatTipsMessage(tip) {
      return '*' + tip.heading + '*\n' + tip.details;
    }
  }, {
    key: '_startMessage',
    value: function _startMessage() {
      var name = this.name;
      var channel = this.channel;
      var team = this.team;

      var date = new Date().toString();
      var cron = (0, _cronHelpers.cronPrettyPrint)(this.schedule);

      this.postMessageToChannel(this.channel, (0, _utils.singleLineString)(_templateObject, name, cron));

      return '\n      ' + date + ' - Bot is now running!\n      Will post tips to team \'' + team.name + '\' on channel \'#' + channel + '\' ' + cron + '.\n      Take a look at your Slack channel, you should have gotten a welcome message by ' + name + '.\n    ';
    }
  }, {
    key: '_invalidFilePath',
    value: function _invalidFilePath(err) {
      return 'File path "' + this.filePath + '" does not exists or it\'s not readable.';
    }
  }, {
    key: '_invalidCronFormat',
    value: function _invalidCronFormat(err) {
      return 'Invalid cron format supplied.';
    }
  }, {
    key: '_invalidFormatError',
    value: function _invalidFormatError(err) {
      return '\n      Invalid format of JSON file.\n      It has to be an array containing objects with the following structure:\n      { heading: \'<STRING>\', details: \'<STRING>\' }\n    ';
    }
  }, {
    key: '_invalidChannel',
    value: function _invalidChannel(err) {
      return '\n      Invalid channel supplied.\n      The channel \'' + this.channel + '\' does not exist on team \'' + this.team.name + '\'.\n    ';
    }
  }]);

  return TipsBot;
}(_slackbots2.default), (_applyDecoratedDescriptor(_class.prototype, '_startMessage', [_utils.print], Object.getOwnPropertyDescriptor(_class.prototype, '_startMessage'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_invalidFilePath', [_utils.exit, _utils.print], Object.getOwnPropertyDescriptor(_class.prototype, '_invalidFilePath'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_invalidCronFormat', [_utils.exit, _utils.print], Object.getOwnPropertyDescriptor(_class.prototype, '_invalidCronFormat'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_invalidFormatError', [_utils.exit, _utils.print], Object.getOwnPropertyDescriptor(_class.prototype, '_invalidFormatError'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_invalidChannel', [_utils.exit, _utils.print], Object.getOwnPropertyDescriptor(_class.prototype, '_invalidChannel'), _class.prototype)), _class);
exports.default = TipsBot;