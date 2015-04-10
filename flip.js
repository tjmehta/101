/**
 * @module 101/flip
 */

/**
 * Returns a function with flipped arguments
 * @function module:101/flip
 * @param {function} f - function to be flipped
 * @return {function}
 */
module.exports = flip;

function flip(f) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return f.apply(this, args.reverse());
  }
}
