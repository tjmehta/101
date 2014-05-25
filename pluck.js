/**
 * @module 101/pluck
 */

var isObject = require('./is-object');
var exists = require('./exists');
var keypather = require('keypather')();

/**
 * Functional version of obj[key], returns the value of the key from obj.
 * When only a key is specified pluck returns a partial-function which accepts obj.
 * @function module:101/pluck
 * @param {object} [obj] - object from which the value is plucked
 * @param {string|array} key - key of the value from obj which is returned
 * @param {boolean} [isKeypath=true] - specifies whether the key is a keypath or key
 * @return {*|function} The value of the key from obj or Partial-function pluck (which accepts obj) and returns the value of the key from obj
 */
module.exports = function (obj, key, isKeypath) {
  if (!isObject(obj)) {
    isKeypath = key;
    key = obj;
    return function (obj) {
      return pluck(obj, key, isKeypath);
    };
  }
  else {
    return pluck(obj, key, isKeypath);
  }
};

function pluck (obj, key, isKeypath) {
  key = Array.isArray(key) ? key[0] : key;
  isKeypath = exists(isKeypath) ? isKeypath : true;
  return isKeypath ?
    keypather.get(obj, key):
    obj[key];
}