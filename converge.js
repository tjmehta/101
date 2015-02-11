/**
 * @module 101/converge
 */

/**
 * Converges an array of functions into one
 * @function module:101/converge
 * @param {function} f
 * @param {Array} array of functions
 * @return {function}
 */
module.exports = converge;

function converge(f, funcs) {

  return function converged(/* args */) {
    var args = Array.prototype.slice.call(arguments);

    return f.apply(null, funcs.map(function(g) {
      return g.apply(null, args);
    }));
  };
}
