var exists = require('./exists');

module.exports = function (o) {
  return typeof o === 'object' && exists(o) && !Array.isArray(o) && !(o instanceof RegExp);
};