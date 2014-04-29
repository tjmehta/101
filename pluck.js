var isObject = require('./isObject');

// (obj, keys)
// (obj, keys..)
// (keys)(obj)
// (keys..)(obj)
module.exports = function () {
  var args = Array.prototype.slice.call(arguments);
  var obj, key;
  if (isObject(args[0])) {
    obj = args[0];
    key = args[1];
    return pluck(obj, key);
  }
  else {
    key = args[0];
    return function (obj) {
      return pluck(obj, key);
    };
  }
};

function pluck (obj, key) {
  key = Array.isArray(key) ? key[0] : key;
  return obj[key];
}