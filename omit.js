/**
 * @module 101/omit
 */

var isObject = require('./is-object');
var isString = require('./is-string');

/**
 * Returns a new object without the specified keys.
 * When only keys are specified omit returns a partial-function which accepts obj.
 * @function module:101/omit
 * @param {Object} [obj] - object whose keys are omited
 * @param {String|Array} keys... - keys which will be dropped from obj (can be specifieds as args
 *   (strings and/or arrays)
 * @return {Object|Function} Object without the specified keys from the original obj or
 *   Partial-function omit (which accepts obj) and returns an object
 */
module.exports = function () {
  var omitKeysArray;
  var omitObject;

  if (arguments.length === 0) {
    return function (obj) { return obj; }
  }

  if (arguments.length <= 1) {
    // Return partial function
    // Only keys provided, will return a function that takes an abject as an argument omits the keys
    if (isObject(arguments[0])) {
      return arguments[0];
    }

    if (isString(arguments[0])) {
      omitKeysArray = [arguments[0]];
    } else if (!Array.isArray(arguments[0])) {
      throw new Error('101/omit invalid arguments');
    } else {
      omitKeysArray = arguments[0];
    }

    return function (obj) {
      return omit(obj, omitKeysArray);
    }
  } else if (arguments.length > 1) {
    if (!isObject(arguments[0])) {
      throw new Error('101/omit invalid arguments');
    }
    omitKeysArray = Array.prototype.slice.call(arguments);
    omitObject = omitKeysArray.shift();
    omitKeysArray = omitKeysArray.reduce(function (prev, cur) { return prev.concat(cur); }, []);
    return omit(omitObject, omitKeysArray);
  }
};

/**
 * @param {Object} obj
 * @param {Array} omitKeys
 * @return Object
 */
function omit (obj, omitKeys) {
  var returnObject = {};
  Object.keys(obj).forEach(function (key) {
    if (~omitKeys.indexOf(key)) { return; }
    returnObject[key] = obj[key];
  });
  return returnObject;
}
