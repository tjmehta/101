/**
 * @module 101/rest-param
 */

var slice = Array.prototype.slice;

/**
 * Returns a function with an appended rest param
 * @function module:101/rest-param
 * @param {function} f - function append a rest param
 * @return {function}
 */
module.exports = function(f) {
  var pos = f.length - 1;

  return function() {
    var params = slice.call(arguments, 0, pos);

    params[pos] = slice.call(arguments, pos);
    return f.apply(this, params);
  };
};
