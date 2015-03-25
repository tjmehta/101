/**
 * @module 101/defaults
 */

var exists = require('./exists');

/**
 * Mixes in properties from source into target when
 * the property is not a property of `target`
 * @param  {Object} [target] Mix into
 * @param  {Object} source The defaults description
 * @return {Object}        THe resulting target
 */
module.exports = defaults;

function defaults (target, source) {
  if (arguments.length === 1) {
    source = target;
    return function (target) {
      return defaults(target, source);
    };
  }
  target = target || {};
  if (!source) {
    return target;
  }
  return Object.keys(source).reduce(function (target, key) {
    target[key] = exists(target[key]) ? target[key] : source[key];
    return target;
  }, target);
}