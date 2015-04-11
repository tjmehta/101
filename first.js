/**
 * @module 101/first
 */

var exists = require('./exists');
var isFunction = require('./is-function');

/**
 * Returns the first value of the item.
 * @function module:101/first
 * @param {array|string|object} item - item whose first value is returned
 * @return {*} First value of an array. First char of a string. First value of an object. First char of item.toString() for everything else.
 */
module.exports = first;

function first (item) {
  var val;
  if (exists(item && item.length) && !isFunction(item)) {
    val = item[0];
  }
  else {
    val = (item && item.toString) ? first(item.toString()) : undefined;
  }
  return val;
}
