/** 
 * @module 101/is-integer
 */ 

var isNumber = require('./is-number');

/**
 * Returns true if n is an integer.
 * @function module:101/is-integer
 * @param {*} val - value checked to be a string
 * @return {boolean} Whether the value is an integer or not
 */

module.exports = isInteger;

function isInteger (val) {
	return isNumber(val) && val % 1 === 0;
};