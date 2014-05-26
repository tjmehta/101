/**
 * @module 101/set
 */

var exists = require('./exists');
var keypather = require('keypather')();

/**
 * Functional version of obj[key] = val.
 * When only a key and val are specified set returns a partial-function which accepts obj.
 * @function module:101/set
 * @param {*} [obj] - object on which the values will be set
 * @param {string} key - key of the value being set on obj
 * @param {*} val - value of the key being set on obj
 * @return {*|function} New obj with new value set or Partial-function set (which accepts obj) and returns a new obj with val set
 */
module.exports = function (obj, key, val) {
  if (arguments.length === 2) {
    val = key;
    key = obj;
    return function (obj) {
      return set(obj, key, val);
    };
  }
  else {
    return set(obj, key, val);
  }
};

function set (obj, key, val) {
  obj[key] = val;
  return obj;
}