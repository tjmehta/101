/**
 * @module 101/is-number
 */

/**
 * Functional version of val typeof 'number'
 * @function module:101/is-number
 * @param {*} val - value checked to be a string
 * @return {boolean} Whether the value is an string or not
 */
module.exports = isNumber;

function isNumber (val) {
  return (typeof val === 'number' || val instanceof Number) && !isNaN(val)
}
