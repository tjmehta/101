/**
 * @module 101/del
 */

var keypather = require('keypather')();
var isString = require('./is-string');
var isObject = require('./is-object');

/**
 * Functional version of delete obj[key].
 * When only a key is specified del returns a partial-function which accepts obj.
 * @function module:101/del
 * @param {*} [obj] - object on which the values will be del
 * @param {string} key - key of the value being del on obj
 * @return {*|function} The same obj without the deleted key or Partial-function del (which accepts obj) and returns the same obj without the deleted key.
 */
module.exports = del;

function del (obj, key) {
  if (arguments.length === 1) {
    // (key)
    key = obj;
    return function (obj) {
      return _del(obj, key);
    };
  }
  else {
    return _del(obj, key);
  }
}

function _del (obj, key) {
  var keys;

  if (isObject(obj) && numberOrString(key)) {
    // (obj, key)
    keypather.del(obj, key);
    return obj;
  }
  else if (isObject(obj) && Array.isArray(key)) {
    // (obj, keys)
    keys = key;

    for (var i = 0; i < keys.length; i++) {
      keypather.del(obj, keys[i]);
    }
    return obj;
  }
  else {
    throw new TypeError('Invalid arguments: expected str, val or val, obj');
  }
}

function numberOrString (val) {
  return isString(val) || typeof val === 'number';
}
