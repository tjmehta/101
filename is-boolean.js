/**
 * @module 101/is-boolean
 */

/**
 * Functional version of val typeof 'boolean'
 * @function module:101/is-boolean
 * @param {*} val - value checked to be a boolean
 * @return {boolean} Whether the value is a boolean or not
 */
module.exports = function (val) {
  return typeof val === 'boolean';
};