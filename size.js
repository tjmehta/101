var pluck = require('101/pluck')

module.exports = size;

/*
* Returns size of each element in object.
*/
function size(object) {
  if(!(object instanceof Array)) {
    object = [object];
  }

  /* 
  * helper function to convert primitives to objects
  * (should we allow only string primitives to be converted?
  *  as it stands, the number 100 will be converted to "100"
  *  which will return a length of 3.)
  */
  function toObject(primitive) {
    if(typeof primitive == "object" && null != primitive) {
      return primitive;
    }
    else {
      /* if input isn't null, undefined, boolean, or infinity */
      if(typeof primitive != "undefined" &&
         typeof primitive != "boolean" &&
         primitive != Infinity &&
         null != primitive) {
        /* return an object */
        return new String(primitive);
      }
      else {
        /* otherwise, return an empty object */
        return [];
      }
    }
  }
 
  /* make sure we don't mess with the global namespace */
  var keys = Object.keys.bind(Object);

  var arr = object.map(toObject).map(keys).map(pluck('length'))
  return arr;
}
