var eql = require('deep-eql');
var isObject = require('./is-object');
var isArray = Array.isArray;

module.exports = function (obj, props) {
  if (arguments.length === 1) {
    props = obj;
    return function (obj) {
      return hasProps(obj, props);
    };
  }
  else {
    return hasProps(obj, props);
  }
};

function hasProps (obj, props) {
  var has = false;

  if (isObject(props)) {
    has = Object.keys(props).every(function (key) {
      return eql(obj[key], props[key]);
    });
  }
  else if (isArray(props)) {
    has = props.every(function (key) {
       return key in obj;
    });
  }

  return has;
}