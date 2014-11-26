/**
 * @module 101/is-empty
 *
 */

var isString = require('./is-string');
var isObject = require('./is-object');
var isArray = Array.isArray;

/**
 * Functional version of val empty object, array or object
 * @function module:101/is-empty
 * @param {*} val - value checked to be a empty
 * @return {boolean} Whether the value is an empty or not
 */
module.exports = function (val) {
  if(isString(val)) {
      return (val.length === 0 || !val.trim());
  } else if(isObject(val) || isArray(val)) {
      for (var name in val) {
          return false;
      } return true;
  } else {
      throw new TypeError('first argument must be a string, object or array');
  }
};
