var equals = require('./equals');

/**
 * @module 101/env-is
 */

/**
 * Functional version of str === process.env.NODE_ENV. Or's multiple environments.
 * @function module:101/env-is
 * @param {*} array - Array of environments to check
 * @return {boolean} Any of the supplied arguments exists in process.env.NODE_ENV
 */
module.exports = envIs;

function envIs () {
  var args = Array.prototype.slice.call(arguments);
  return args.some(equals(process.env.NODE_ENV));
}