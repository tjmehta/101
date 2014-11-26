/**
 * @module 101/equals
 */

/**
 * Functional version of ===
 * @function module:101/equals
 * @param {*} a - any value
 * @param {*} b - any value
 * @return {boolean} a === b
 */
module.exports = function (a, b) {
  if (arguments.length === 1) {
    return equals.bind(null, a);
  }
  else {
    return equals(a, b);
  }
};

function equals (a, b) {
  return a === b;
}