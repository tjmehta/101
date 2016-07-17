/**
 * @module 101/put
 */

var clone = require("./clone");
var isString = require('./is-string');
var isNumber = require('./is-number');
var isObject = require('./is-object');
var keypather = require('keypather')();

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
  var setObj;
  if (arguments.length === 1) {
    // (setObj)
    setObj = obj;
    return function (obj) {
      return putKeypaths(obj, setObj); // extends original
    };
  }
  if (arguments.length === 2) {
    if (isString(obj) || isNumber(obj)) {
      // (key, val)
      val = key;
      key = obj;
      setObj = {};
      keypather.set(setObj, key, val);
      return function (obj) {
        return putKeypaths(obj, setObj); // extends original
      };
    }
    else if (isObject(key)) {
      // (obj, setObj)
      setObj = key;
      return putKeypaths(obj, setObj); // extends original
    }
    else {
      throw new TypeError('Invalid arguments: expected string, number, or object');
    }
  }
  else {
    setObj = {};
    setObj[key] = val
    return putKeypaths(obj, setObj); // extends original
  }
}

function putKeypaths (obj, setObj) {
  // copy the object
  obj = clone(obj);
  Object.keys(setObj).forEach(function (keypath) {
    var val = setObj[keypath];
    keypather.set(obj, keypath, val);
  });
  return obj;
}