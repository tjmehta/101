/**
 * @module 101/pick
 */

var isObject = require('./is-object');

/**
 * Returns a new object with the specified keys (with key values from obj).
 * When only keys are specified pick returns a partial-function which accepts obj.
 * @function module:101/pick
 * @param {object} [obj] - object whose keys are picked
 * @param {string|regexp|array} keys... - keys which will be taken from obj, can be specifieds as args (strings, regular epxressions, and/or arrays)
 * @return {object|function} Object with only the keys specified from the original obj or Partial-function pick (which accepts obj) and returns an object
 */
module.exports = function () {
  var args = Array.prototype.slice.call(arguments);
  if (isObject(args[0])) {
    var obj = args.shift();
    return pick(obj, args);
  }
  else {
    return function (obj) {
      return pick(obj, args);
    };
  }
};

function pick (obj, args) {
  var keys = [];
  var regexps = [];
  function concatElement(el) {
    if (el instanceof RegExp) {
      regexps = regexps.concat(el);
    }
    else {
      keys = keys.concat(el);
    }
  }
  args.forEach(function (element) {
    if (Array.isArray(element)) {
      element.forEach(function(subelement){
        concatElement(subelement);
      });
    }
    else {
      concatElement(element);
    }
  });
  var out = {};
  if (keys.length > 0) {
    keys.forEach(copyWithString(obj, out));
  }
  if (regexps.length > 0) {
    regexps.forEach(function(regexp){
      Object.keys(obj).forEach(copyWithRegExp(obj, out, regexp));
    });
  }
  return out;
}

function copyWithString (from, to) {
  return function (key) {
    if (key in from) {
      to[key] = from[key];
    }
  };
}

function copyWithRegExp (from, to, regexp) {
  return function (key) {
    if (regexp.test(key)) {
      to[key] = from[key];
    }
  };
}