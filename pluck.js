/**
 * @module 101/pluck
 */

var isObject = require('./is-object');

/**
 * Functional version of obj[key], returns the value of the key from obj.
 * When only a key is specified pluck returns a partial-function which accepts obj.
 * @function module:101/pluck
 * @param {object} [obj] - object from which the value is plucked
 * @param {string|array} key - key of the value from obj which is returned
 * @return {*|function} The value of the key from obj or Partial-function pluck (which accepts obj) and returns the value of the key from obj
 */
module.exports = function (obj, key) {
  if (!isObject(obj)) {
    key = obj;
    return function (obj) {
      return pluck(obj, key);
    };
  }
  else {
    return pluck(obj, key);
  }
};

function pluck (obj, key) {
  key = Array.isArray(key) ? key[0] : key;
  return obj[key];
}