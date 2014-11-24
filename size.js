module.exports = size;

/*
* Returns length of an object ( [], {}, "strings" )
*/
function size(object) {
  var size = 0, key;
  
  for(key in object) {
    if(object.hasOwnProperty(key)) size++;
  }

  return size;
}
