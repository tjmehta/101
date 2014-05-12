/**
 * @module 101/apply
 */

/**
 * Functional version of function.apply
 * @function module:101/apply
 * @param {*} thisArg - Context applied to fn
 * @param {array} args - Arguments applied to fn
 * @return {function} function which accepts a function, fn, and applies thisArg, and args to it. Returns fn.apply(thisArg, args).
 */
module.exports = apply;

function apply (thisArg, args) {
  return function (fn) {
    return fn.apply(thisArg, args);
  };
}