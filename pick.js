var isObject = require('./isObject');

// (obj, keys)
// (obj, keys..)
// (obj, keys.., keys.., keys.., ...)
// (keys)(obj)
// (keys..)(obj)
// (keys.., keys.., keys.., ...)(obj)
module.exports = function () {
  var args = Array.prototype.slice.call(arguments);
  if (isObject(args[0])) {
    var obj = args.shift();
    return pick(obj, args);
  }
  else {
    return function (obj) {
      return pick(obj, args);
    };
  }
};

function pick (obj, args) {
  var keys = [];
  args.forEach(function (key) {
    keys = keys.concat(key);
  });
  var out = {};
  keys.forEach(copy(obj, out));
  return out;
}

function copy (from, to) {
  return function (key) {
    if (key in from) {
      to[key] = from[key];
    }
  };
}