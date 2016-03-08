/**
 * @module 101/omit
 */

var isObject = require('./is-object');
var pick = require('./pick')
var keypather = require('keypather')()

/**
 * Returns a new object without the specified keys.
 * When only keys are specified omit returns a partial-function which accepts obj.
 * @function module:101/omit
 * @param {object} [obj] - object whose keys are omited
 * @param {string|array} keys... - keys which will be dropped from obj (can be specifieds as args (strings and/or arrays)
 * @return {object|function} Object without the specified keys from the original obj or Partial-function omit (which accepts obj) and returns an object
 */
module.exports = function () {
  var args = Array.prototype.slice.call(arguments);
  if (isObject(args[0])) {
    var obj = args.shift();
    return omit(obj, args);
  }
  else {
    return function (obj) {
      return omit(obj, args);
    };
  }
};

function omit (obj, args) {
  var omitKeys = [];
  args.forEach(function (key) {
    omitKeys = omitKeys.concat(key);
  });
  var keys = Object.keys(obj);
  var out = pick(obj, keys);
  omitKeys.forEach(remove(out));
  return out;
}

function remove (obj) {
  return function (key) {
    keypather.del(obj, key);
  };
}
