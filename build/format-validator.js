'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeValidator = require('node-validator');

var _nodeValidator2 = _interopRequireDefault(_nodeValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var childrenObjects = _nodeValidator2.default.isObject().withRequired('heading', _nodeValidator2.default.isString()).withRequired('details', _nodeValidator2.default.isString());

var JSON_TIPS_FORMAT = _nodeValidator2.default.isArray(childrenObjects);

exports.default = function (json) {
  return new Promise(function (resolve, reject) {
    _nodeValidator2.default.run(JSON_TIPS_FORMAT, json, function (errorCount, errors) {
      if (errorCount) reject(errors);else resolve();
    });
  });
};