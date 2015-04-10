var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var xor = require('../xor');

describe('xor', function() {
  it('should work with reduce', function (done) {
    expect([true, true, true].reduce(xor, true)).to.equal(false);
    expect([false, false, false].reduce(xor, false)).to.equal(false);
    expect([false, false, false].reduce(xor, true)).to.equal(true);
    expect([true, false, false].reduce(xor)).to.equal(true);
    expect([false, true, false].reduce(xor)).to.equal(true);
    expect([false, false, true].reduce(xor)).to.equal(true);
    expect([false, true, true].reduce(xor)).to.equal(false);
    expect([true, false, true].reduce(xor)).to.equal(false);
    expect([true, true, false].reduce(xor)).to.equal(false);
    done();
  });
});
