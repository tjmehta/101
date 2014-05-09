/**
 * @module 101/pick
 */

var isObject = require('./is-object');

/**
 * Returns a new object with the specified keys (with key values from obj).
 * When only keys are specified pick returns a partial-function which accepts obj.
 * @function module:101/pick
 * @param {object} [obj] - object whose keys are picked
 * @param {string|array} keys... - keys which will be taken from obj (can be specifieds as args (strings and/or arrays)
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
  args.forEach(function (key) {
    keys = keys.concat(key);
  });
  var out = {};
  keys.forEach(copy(obj, out));
  return out;
}

function copy (from, to) {
  return function (key) {
    if (key in from) {
      to[key] = from[key];
    }
  };
}