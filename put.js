/**
 * @module 101/put
 */

var clone = require("./clone");
var assign = require('./assign');
var isString = require('./is-string');
var isObject = require('./is-object');
var isNumber = require('./is-number');

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
  if (!arguments.length) {
    throw new TypeError('Invalid number of arguments: expected at least one');
  }
  if (arguments.length === 1) {
    // (putObj)
    putObj = obj;
    if (!isObject(putObj)) throw new TypeError('Invalid arguments: expected putObj');
    return function (obj) {
      return assign(clone(obj), putObj); // returns new object
    };
  }
  if (arguments.length === 2) {
    if (isString(obj) || isNumber(obj)) {
      // (key, val)
      val = arguments[1];
      key = arguments[0];
      putObj = {};
      putObj[key] = val;
      return function (obj) {
        return assign(clone(obj), putObj); // returns new object
      };
    }
    else if (isObject(key)) {
      // (obj, putObj)
      putObj = key;
      return assign(clone(obj), putObj);
    }
    else {
      throw new TypeError('Invalid arguments: expected key, val or obj, putObj');
    }
  }
  else {
    putObj = {};
    putObj[key] = val;
    return assign(clone(obj), putObj); // returns new object
  }
}
