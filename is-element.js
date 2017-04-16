/**
 * @module 101/is-element
 */

/**
 * Functional version of val DOM element
 * @function module:101/is-element
 * @param {*} val - value checked to be a DOM element
 * @return {boolean} Whether the value is a DOM element or not
 */
module.exports = isElement;

function isElement (v) {
  return !!(v && v.nodeType === 1);
}