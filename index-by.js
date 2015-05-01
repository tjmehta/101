/**
 * @module 101/indexBy
 */

var isString = require('./is-string');

/**
 * Hashes an array of objects based on the value of a provided common key.
 * @function module:101/index-by
 * @param {array|function|string} [obj] - object from which the value is plucked
 * @param {string|function} indexer - the common key or function which accepts and object and returns an index key
 * @return {obj|function} An object whose keys are the values of their common key and values are the original values. Or a partial funciton which applies the passed indexer to each object.
*/
module.exports = function() {
  if (arguments.length == 1) {
    return indexBy(arguments[0]); 
  }
  else if (arguments.length == 2) {
    return arguments[0].reduce(indexBy(arguments[1]), {});
  }
  else {
    return {};
  }
}

function indexBy (indexer) {
  if (isString(indexer)) {
    return function(prev, cur, index, arr) {
      prev[cur[indexer]] = cur;
      return prev;
    };
  }
  else {
    return function(prev, cur, index, arr) {
      prev[indexer(cur)] = cur;
      return prev;
    };
  }
}