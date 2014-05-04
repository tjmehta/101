var eql = require('deep-eql');
var isObject = require('./is-object');
var isBoolean = require('./is-boolean');
var isArray = Array.isArray;

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