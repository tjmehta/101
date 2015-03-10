/**
 * @module 101/find-index
 */

var isFunction = require('./is-function');
var exists = require('./exists');

/**
 * Finds the first value in the list that passes the given function (predicate) and returns it's index.
 * If list is not provided findIndex will return a partial-function which accepts a list as the first argument.
 * @function module:101/find-index
 *
 * @param {array|string} list - list to be searched
 * @param {function} predicate - executed on each item in the list and returns true when the item is found
 * @return {number} - index of first item which passes predicate
 *
 * @param {function} predicate - executed on each item in the list and returns true when the item is found
 * @return {function} - partial function (accepts list and returns index of first item that passes predicate)
 */
module.exports = function (list, predicate) {
  if (exists(list && list.length) && !isFunction(list)) {
    return findIndex(list, predicate);
  }
  else if (isFunction(list)) {
    predicate = list;
    return function (list) {
      return findIndex(list, predicate);
    };
  }
  else {
    throw new TypeError('first argument must be a list (have length) or function');
  }
};

function findIndex (list, predicate) {
  if (!exists(list && list.length)) {
    throw new TypeError('list must have length property');
  }
  if (!isFunction(predicate)) {
    throw new TypeError('predicate must be a function');
  }

  var index = -1;
  list = Array.prototype.slice.call(list); // cast as array to use some.
  list.some(function (val, i) {
    if (predicate(val, i, list)) {
      index = i;
      return true;
    }
  });

  return index;
}
