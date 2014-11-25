/**
 * @module 101/and
 */

/**
 * Functional version of &&
 * @function module:101/and
 * @param {*} a - any value
 * @param {*} b - any value
 * @return {boolean} a && b
 */
module.exports = and;

function and (a, b) {
  if (arguments.length == 2) {
    return a && b;
  }
  var result = true;
  for (var i = 0; i < arguments.length; i++) {
    result = result && arguments[i];
  }
  return result;
}
