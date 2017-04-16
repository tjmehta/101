/**
 *    @module 101/uid
 *    this module could generate a unique id 
 */

/**
 *    @function module:101/uid
 *    @param {*} prefix - any value
 *    @return {prefix}+uid
 */

exports = module.exports = (function () {
  var uid = 1
  return function (prefix) {
    if (prefix) {
      return prefix + uid++
    }else{
      return uid++
    }
  }
})()
