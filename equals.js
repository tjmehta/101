module.exports = function (a, b) {
  if (arguments.length === 1) {
    return equals.bind(null, a);
  }
  else {
    return equals(a, b);
  }
};

function equals (a, b) {
  return a === b;
}