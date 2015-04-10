/**
 * @module 101/curry
 */
 
var slice = Array.prototype.slice;

/**
 * Returns a curried function
 * @function module:101/curry
 * @param {function} f - function to be curried
 * @param {integer} [n] - how many arguments to curry
 * @return {function} 
 */
module.exports = curry;

function curry(f, n) {
  var length = n || f.length;
  return _curry(f, length, []);
}

function _curry(f, n, args) {

  return function(/* args */) {
    var curryArgs = args.concat(slice.call(arguments));

    if (curryArgs.length >= n) {
      return f.apply(null, curryArgs.slice(0, n));
    } else {
      return _curry(f, n, curryArgs);
    }
  };
}
