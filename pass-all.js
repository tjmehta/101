/**
 * @module 101/pass-all
 */

var isFunction = require('./is-function');
var and = require('./and');
var apply = require('./apply');

/**
 * Muxes arguments across many functions and &&'s the results
 * @function module:101/pass-all
 * @param {function} funcs... - functions which return a boolean
 * @return {function} function which accepts args which it applies to funcs and &&s the results
 */
module.exports = passAll;

function passAll (/* funcs */) {
  var funcs = Array.prototype.slice.call(arguments);
  if (!funcs.every(isFunction)) {
    throw new TypeError('all funcs should be functions');
  }
  return function (/* arguments */) {
    return funcs.map(apply(this, arguments)).reduce(and);
  };
}