/**
 * @module 101/find
 */

var isFunction = require('./is-function');
var exists = require('./exists');
var findIndex = require('./find-index');

/**
 * Finds the first value in the list that passes the given function (predicate) and returns it's index.
 * If list is not provided find will return a partial-function which accepts a list as the first argument.
 * @function module:101/find
 *
 * @param {array|string} list - list to be searched
 * @param {function} predicate - executed on each item in the list and returns true when the item is found
 * @return {*} - first element which passes predicate
 *
 * @param {function} predicate - executed on each item in the list and returns true when the item is found
 * @return {function} - partial function (accepts list and returns first element that passes predicate)
 */
module.exports = find;

function find (list, predicate) {
  if (exists(list && list.length) && !isFunction(list)) {
    var index = findIndex(list, predicate);
    return ~index ? list[index] : null;
  }
  else if (isFunction(list)) {
    predicate = list;
    return function (list) {
      if (!exists(list && list.length)) {
        throw new TypeError('list must have length property');
      }
      var index = findIndex(list, predicate);
      return ~index ? list[index] : null;
    };
  }
  else {
    throw new TypeError('first argument must be a list (have length) or function');
  }
}
