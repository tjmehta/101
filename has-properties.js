/**
 * @module 101/has-properties
 */

var eql = require('deep-eql');
var isObject = require('./is-object');
var isBoolean = require('./is-boolean');
var isArray = Array.isArray;

/**
 * Determines whether the keys exist and, if specified, has the values.
 * If obj is not provided findIndex will return a partial function which accepts a obj as the first argument.
 * @function module:101/has-properties
 * @param {object} [obj] - the object whose properties being checked
 * @param {object|array} properties - keys and values (object) or keys expected to exist on the object (array)
 * @param {boolean} [deep] - deep equals when values are specified (objects are recursed),
 *   deep key existance (prototype) when only keys are specified
 * @return {boolean|function} Has keypaths or Partial-function hasProperties (which accepts obj)
 */
module.exports = function (obj, props, deep) { // deep defaults to true
  if (isBoolean(props)) {
    deep = props;
    props = null;
  }
  if (arguments.length === 1 || arguments.length === 2 && !props) {
    props = obj;
    return function (obj) {
      return hasProperties(obj, props, deep);
    };
  }
  else {
    return hasProperties(obj, props, deep);
  }
};

function hasProperties (obj, props, deep) {
  var has = false;
  deep = !isBoolean(deep) ? true : deep;
  if (isObject(props)) {
    has = Object.keys(props).every(function (key) {
      return deep ?
        eql(obj[key], props[key]) :
        obj[key] === props[key];
    });
  }
  else if (isArray(props)) {
    has = props.every(function (key) {
      return deep ?
        (key in obj) :
        obj.hasOwnProperty(key);
    });
  }

  return has;
}