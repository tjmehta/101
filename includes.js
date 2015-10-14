/**
 * Assert if a given array contains a value
 * @module 101/includes
 */
'use strict';

var isNumber = require('./is-number');

/**
 * @param {Array} array
 * @param {*} searchElement
 * @param {Number} fromIndex
 * @return Boolean
 */
module.exports = function (array, searchElement, fromIndex) {
  if (arguments.length === 1) {
    return includes.bind(null, array);
  } else {
    return includes(array, searchElement, fromIndex);
  }
};

function includes (array, searchElement, fromIndex) {
  if (!isNumber(fromIndex)) {
    fromIndex = 0;
  }
  if (Array.prototype.includes) {
    return Array.prototype.includes.call(array, searchElement, fromIndex);
  } else {
    // ES7 Array.prototype.includes polyfill (modified)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes#Browser_compatibility
    var O = Object(array);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = fromIndex;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  }
}
