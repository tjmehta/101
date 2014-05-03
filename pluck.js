var isObject = require('./is-object');

// (obj, key)
// (key)(obj)
module.exports = function (obj, key) {
  if (!isObject(obj)) {
    key = obj;
    return function (obj) {
      return pluck(obj, key);
    };
  }
  else {
    return pluck(obj, key);
  }
};

function pluck (obj, key) {
  key = Array.isArray(key) ? key[0] : key;
  return obj[key];
}