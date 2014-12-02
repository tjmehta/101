/**
 * @module 101/is-empty
 */

var isString = require('./is-string');
var isObject = require('./is-object');
var isArray = Array.isArray;

/**
 * Functional version of val empty object, array or object
 * @function module:101/is-empty
 * @param {string|array|object} val - value checked to be a empty
 * @return {boolean} Whether the value is an empty or not
 */
module.exports = isEmpty;

function isEmpty (val) {
  if (isString(val) || isArray(val)) {
    return val.length === 0;
  }
  else if (isObject(val)) {
    for (var name in val) {
      return false;
    }
    return true;
  }
  else {
    throw new TypeError('Val must be a string, array or object');
  }
}
