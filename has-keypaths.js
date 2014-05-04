var eql = require('deep-eql');
var keypather = require('keypather')();
var isObject = require('./is-object');
var isBoolean = require('./is-boolean');
var isArray = Array.isArray;

module.exports = function (obj, props, deep) {
  if (arguments.length === 1) {
    props = obj;
    return function (obj) {
      return hasKeypaths(obj, props, deep);
    };
  }
  else {
    return hasKeypaths(obj, props, deep);
  }
};

function hasKeypaths (obj, props, deep) {
  var has = false;
  deep = !isBoolean(deep) ? true : deep;
  if (isObject(props)) {
    has = Object.keys(props).every(function (keypath) {
      return deep ?
         eql(keypather.get(obj, keypath), props[keypath]) :
         keypather.get(obj, keypath) === props[keypath];
    });
  }
  else if (isArray(props)) {
    has = props.every(function (keypath) {
      return deep ?
        keypather.in(obj, keypath) :
        keypather.has(obj, keypath);
    });
  }

  return has;
}