/**
 * @module 101/bind-all
 */

var isFunction = require('./is-function');
var keysIn = require('./keys-in');
/**
 * Bind a passed object methods.
 * If methods name to bing are not specified, all the object methods are binded
 * @function module:101/bind-all
 *
 * @param {object} object - object to bind
 * @param {array|string} [methods] - array or space-separated string containing the names of the methods to bind
 * @return {object} the binded object
 */
module.exports = bindAll;

function bindAll (object, methods) {
  var keys;
  if (methods) {
    // if we passed an array, set keys to the passed array
    if (Array.isArray(methods)) {
      keys = methods;
    } else if (typeof methods === 'string') {
      // if a string was paased, split it by spaces
      keys = methods.split(/\s/);
    } else {
      throw new TypeError('The second argument must be an array or a string');
    }
  } else {
    keys = keysIn(object);
  }

  if (!keys.length) { return object; }

  // Bind all the specified methods
  keys.forEach(function(key) {
    var target = object[key];
    // skip for non-functions and when the target does not exist
    if (!target || !isFunction(target)) { return; }

    object[key] = target.bind(object);
  });

  return object;
}
