/**
 * @module 101/compose
 */

var isFunction = require('./is-function');
var toArray = Array.prototype.slice;

/**
 * Composes a new function from the given functions
 * @function module:101/compose
 * @param {function} funcs...
 * @return {function} 
 */
module.exports = compose;
 
function _compose2(f, g) {
  return function composed(/* args */) { 
    var args = toArray.call(arguments);

    return f(g.apply(null, args));
  } 
}

function compose(/* funcs */) {
  var funcs = toArray.call(arguments);

  return funcs
    .filter(isFunction)
    .reduce(_compose2);
}
