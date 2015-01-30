/**
 * @module 101/not
 */

var isFunction = require('./is-function');

/**
 * Functional version of !
 * @function module:101/not
 * @param {*} val - value to inverse
 * @return {function} - function whose arguments and context are applied to fn and result is inversed
 */
module.exports = not;

function not (val) {
  if (isFunction(val)) {
    return function (/* args */) {
      return not(val.apply(this, arguments));
    };
  }
  else {
    return !val;
  }
}