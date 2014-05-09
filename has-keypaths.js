/**
 * @module 101/has-keypaths
 */

var eql = require('deep-eql');
var keypather = require('keypather')();
var isObject = require('./is-object');
var isBoolean = require('./is-boolean');
var isArray = Array.isArray;

/**
 * Determines whether the keypaths exist and have the specified values.
 * If obj is not provided findIndex will return a partial-function which accepts a obj as the first argument.
 * @function module:101/has-keypaths
 * @param {object} [obj] - the object whose properties being checked
 * @param {object|array} keypaths - keypaths and values (object) or keypath strings expected to exist on the object (array)
 * @param {boolean} [deep] - deep equals when values are specified (objects are recursed),
 *   deep keypath existance (prototype) when only keys are specified
 * @return {boolean|function} Has keypaths or Partial-function function hasKeypaths (which accepts obj)
 */
module.exports = function (obj, keypaths, deep) {
  if (arguments.length === 1) {
    keypaths = obj;
    return function (obj) {
      return hasKeypaths(obj, keypaths, deep);
    };
  }
  else {
    return hasKeypaths(obj, keypaths, deep);
  }
};

function hasKeypaths (obj, keypaths, deep) {
  var has = false;
  deep = !isBoolean(deep) ? true : deep;
  if (isObject(keypaths)) {
    has = Object.keys(keypaths).every(function (keypath) {
      return deep ?
        eql(keypather.get(obj, keypath), keypaths[keypath]) :
        keypather.get(obj, keypath) === keypaths[keypath];
    });
  }
  else if (isArray(keypaths)) {
    has = keypaths.every(function (keypath) {
      return deep ?
        keypather.in(obj, keypath) :
        keypather.has(obj, keypath);
    });
  }

  return has;
}