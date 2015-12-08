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
  
  if (Object.keys) {
    return Object.keys(object);
  } else {
   var keys = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
  
    return keys; 
  }
}
