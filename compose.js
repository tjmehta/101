/**
 * @module 101/compose
 */

/**
 * [compose description]
 * @function module:101/compose
 * @param {function} f
 * @param {function} g
 * @return {function} 
 */
module.exports = compose;
 
function compose(f,g) {
  return function composed(x) { 
    return f(g(x));
  } 
}
