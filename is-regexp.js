/**
 * @module 101/is-regexp
 */

/**
 * Check if a value is an instance of RegExp
 * @function module:101/is-regexp
 * @param {*} val - value checked to be an instance of RegExp
 * @return {boolean} Whether the value is an object or not
 */

module.exports = function isRegExp (val) {
  return Object.prototype.toString.call(val) == '[object RegExp]';
};

