/**
 * @module 101/omit
 */

var isObject = require('./is-object');
var clone = require('./clone');

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
  var keys = [];
  args.forEach(function (key) {
    keys = keys.concat(key);
  });
  var out = clone(obj);
  keys.forEach(remove(out));
  return out;
}

function remove (obj) {
  return function (key) {
    delete obj[key];
  };
}
