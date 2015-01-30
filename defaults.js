/**
 * @module 101/defaults
 */

/**
 * Mixes in properties from source into target when
 * the property is not a property of `target`
 * @param  {Object} target Mix into
 * @param  {Object} source The defaults description
 * @return {Object}        THe resulting target
 */
module.exports = function (target, source) {
  target = target || {};

  for (var key in source) {
    if (!(key in target)) target[ key ] = source[ key ];
  }

  return target;
};