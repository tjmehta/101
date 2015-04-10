var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var flip = require('../flip');

function prefix(pre, str) {
  return pre + str;
}

describe('flip', function() {
  it('should flip a function', function (done) {
    expect(flip(prefix)('hello', '_')).to.equal('_hello');
    done();
  });
});
