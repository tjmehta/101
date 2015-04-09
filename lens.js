/**
 * @module 101/lens
 */

var get = require('./pluck');
var put = require('./put');
var curry = require('./curry');
var clone = require('./clone');

/**
 * Returns a lens
 * @function module:101/lens
 * @param {string|function} key|getter - key or getter function
 * @param {function} [setter] - setter function
 * @return {function} lens
 */
module.exports = lens;

function lens(getter, setter) {
  var _lens, key;

  if (arguments.length === 1) {
    // (key)
    key = getter;
    return lens(get(key), _setter(key));
  } else {
    // (getter, setter)
    _lens = getter;
  }

  _lens.set = curry(setter, 2);
  _lens.mod = curry(function(mod, obj) {
    return _lens.set(mod(_lens(obj)), clone(obj));
  });
  return _lens;
}

function _setter(key) {
  return function(value, obj) {
    return put(obj, key, value);
  };
}
