/**
 * @module 101/not
 */

/**
 * Functional version of !
 * @function module:101/not
 * @param {function} fn - function to inverse
 * @return {function} - function whose arguments and context are applied to fn and result is inversed
 */
module.exports = not;

function not (fn) {
  return function (/* args */) {
    return !fn.apply(this, arguments);
  };
}