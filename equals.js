/**
 * @module 101/equals
 */

/**
 * Functional implementation of Object.is with polyfill for browsers without implementations of Object.is
 * @function module:101/equals
 * @param {*} a - any value
 * @param {*} b - any value
 * @return {boolean} Object.is(a, b)
 */
module.exports = function (a, b) {
  if (arguments.length === 1) {
    return equals.bind(null, a);
  }
  else {
    return equals(a, b);
  }
};

function equals (v1, v2) {
  if (Object.is) {
    return Object.is(v1, v2);
  }
  else {
    // ES6 Object.is polyfill
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2;
    }
    if (v1 !== v1) {
      return v2 !== v2;
    }
    return v1 === v2;
  }
}
