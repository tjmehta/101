/**
 * @module 101/is-array
 */

/**
 * Checks if a value is an array.
 * @function module:101/is-array
 * @param {*} val - value checked to be an array
 * @return {boolean} Whether the value is a function or not
 */
module.exports = Array.isArray || isArray;

var toString = Object.prototype.toString;

function isArray (v) {
  return !!v && '[object Array]' === toString.call(v);
}
