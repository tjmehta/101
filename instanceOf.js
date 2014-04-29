// (function)(val)
module.exports = function (Class) {
  return function (v) {
    return v instanceof Class;
  };
};