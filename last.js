var isObject = require('./is-object');
var exists = require('./exists');
var isFunction = require('./is-function');

module.exports = last;

function last (item) {
  var val;
  if (exists(item && item.length) && !isFunction(item)) {
    val = item[item.length - 1];
  }
  else if (isObject(item)) {
    val = item[Object.keys(item).pop()];
  }
  else {
    val = (item && item.toString) ? last(item.toString()) : undefined;
  }
  return val;
}