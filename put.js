/**
 * @module 101/put
 */

var clone = require("./clone");
var assign = require('./assign');
var isString = require('./is-string');

/**
 * Immutable version of obj[key] = val.
 * When only key and val are specified, put returns a partial function which accepts obj.
 * @function module:101/put
 * @param {*} [obj] - object which will be cloned and assigned with {key: value}
 * @param {string|number} key - key of the value being put on obj
 * @param {*} val - value of the key being put on obj
 * @return {*|function} New obj with new value set or Partial-function put (which accepts obj) and returns a new obj with val set
 */
module.exports = put;

function put (obj, key, val) {
  var putObj;
  if (arguments.length === 2) {
    if (isString(obj) || typeof obj === 'number') {
      // (key, val)
      val = arguments[1];
      key = arguments[0];
      putObj = {};
      putObj[key] = val;
      return function (obj) {
        return assign(clone(obj), putObj); // returns new object
      };
    }
    else {
      throw new TypeError('Invalid arguments: expected key, val');
    }
  }
  else if (arguments.length === 3) {
    putObj = {};
    putObj[key] = val;
    return assign(clone(obj), putObj); // returns new object
  }
  else {
    throw new TypeError('Invalid number of arguments: expected 2 or 3');
  }
}
