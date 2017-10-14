/**
 * @module 101/put
 */

var clone = require("./clone");
var assign = require("./assign");
var keypather = require('keypather')();

/**
 * A merge-version of `put`.
 * When only key and val are specified, merge returns a partial function which accepts obj.
 * @function module:101/merge
 * @param {*} [obj] - object which will be cloned and assigned with {key: value}
 * @param {string|number} key - key of the value being merged on obj
 * @param {*} val - value of the key being merged on obj
 * @return {*|function} New obj with new value set or Partial-function merge (which accepts obj) and returns a new obj with val set
 */
 
module.exports = merge;

function merge (obj, key, val) {
  if (arguments.length === 1) {
    val = obj
    return function(obj) {
      var set = clone(obj)
      return assign(set, val);
    }
  }

  if (arguments.length === 2) {
    val = key;
    key = obj;
    return function(obj) {
      var set = clone(obj);
      keypather.set(set, key, val)
      return set;
    }
  }

  var set = clone(obj);
  var old = keypather.get(set, key);
  var merged = assign(old, val)
  keypather.set(set, key, merged);
  return set;
}