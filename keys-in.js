/**
 * @module 101/keys-in
 */

/**
 * Get all the keys compositing an object, including the `Object.prototype`
 * @function module:101/keys-in
 *
 * @param {object} object - the object from which to extract the keys
 * @return {array} array of keys
 */
module.exports = keysIn;

function keysIn(object) {
  if (!object) { return []; }

  var keys = [];

  if (object.prototype) { object = Object.create(object.prototype); }

  for (var key in object) {
    keys.push(key);
  }

  return keys;
}
