/**
 * Retrieve the values of an object's properties
 * @module 101/values
 */
'use strict';

module.exports = values;

/**
 * Borrowing from underscorejs
 * https://github.com/jashkenas/underscore
 * @param {Object} obj
 * @return {Array}
 */
function values (obj) {
  var keys = Object.keys(obj);
  var length = keys.length;
  var vals = new Array(length);
  for (var i = 0; i < length; i++) {
    vals[i] = obj[keys[i]];
  }
  return vals;
}
