/**
 * @module 101/tail
 */

var exists = require('./exists');
var isFunction = require('./is-function');

/**
 * Returns the tail of the item.
 * @function module:101/tail
 * @param {array|string|object} item - item whose tail value is returned
 * @return {*} Tail of an array. Tail char of a string. Tail of an object. Tail char of item.toString() for everything else.
 */
module.exports = tail;

function tail (item) {
  var val;
  if (exists(item && item.length) && !isFunction(item)) {
    val = item.slice(1);
  }
  else {
    val = (item && item.toString) ? tail(item.toString()) : undefined;
  }
  return val;
}
