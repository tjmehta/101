/**
 * @module 101/compose
 */

/**
 * [compose description]
 * @function module:101/compose
 * @param {function} functions
 * @return {function} function
 */
module.exports = compose;
 
function compose(/* funcs */){
  var funcs = Array.prototype.slice.call(arguments);

  return function(seed) {
    return funcs.reduceRight(function(x, f) { return f(x); }, seed);
  };
}
