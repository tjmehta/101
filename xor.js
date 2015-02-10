/**
 * @module 101/xor
 */

/**
 * Exclusive or
 * @function module:101/xor
 * @param {*} a - any value
 * @param {*} b - any value
 * @return {boolean} a xor b
 */

module.exports = xor;

function xor (a, b) {
  return !(!a && !b) && !(a && b);
}
