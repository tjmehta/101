/**
 * @module 101/is-empty-object
 *
 */

/**
 * Functional version of val {} aka empty object
 * @function module:101/is-empty-object
 * @param {*} val - value checked to be a empty object
 * @return {boolean} Whether the value is an empty object or not
 */
module.exports = function (val) {
  for (var name in val) {
		return false;
	} return true;
};
