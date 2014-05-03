var isFunction = require('./is-function');
var isArray = Array.isArray;

module.exports = function (list, predicate) {
  if (list && list.length && !isFunction(list)) {
    return findIndex(list, predicate);
  }
  else if (isFunction(list)) {
    predicate = list;
    return function (list) {
      return findIndex(list, predicate);
    };
  }
  else {
    throw new TypeError('first argument must be list (have length) or function');
  }
};

function findIndex (list, predicate) {
  if (!list || !list.length) {
    throw new TypeError('list must be have length property');
  }
  if (!isFunction(predicate)) {
    throw new TypeError('predicate must be a function');
  }

  var index = -1;
  list = Array.prototype.slice.call(list); // cast as array to use some.
  list.some(function (val, i) {
    if (predicate(val)) {
      index = i;
      return true;
    }
  });

  return index;
}