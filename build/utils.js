'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Taken from https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
var singleLineString = exports.singleLineString = function singleLineString(strings) {
  for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  var output = '';
  for (var i = 0; i < values.length; i++) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  var lines = output.split(/(?:\r\n|\n|\r)/);

  return lines.map(function (line) {
    return line.replace(/^\s+/gm, '');
  }).join(' ').trim();
};

var print = exports.print = function print(target, name, descriptor) {
  var method = descriptor.value;

  descriptor.value = function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var msg = method.apply(this, args);
    console.log(singleLineString(_templateObject, msg));
    if (args[0]) console.error(args[0]);
    return this;
  };
};

var exit = exports.exit = function exit(target, name, descriptor) {
  var method = descriptor.value;

  descriptor.value = function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    method.apply(this, args);
    process.exit(1);
    return this;
  };
};

var promiseWrapper = exports.promiseWrapper = function promiseWrapper(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return new Promise(function (resolve, reject) {
    try {
      fn.apply(undefined, args);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};