var equals = require('./equals');

module.exports = envIs;

function envIs () {
  var args = Array.prototype.slice.call(arguments);
  return args.some(equals(process.env.NODE_ENV));
}