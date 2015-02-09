var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var xor = require('../xor');

describe('xor', function() {
  it('should work with reduce', function (done) {
    expect([true, true, true].reduce(xor, true)).to.eql(false);
    expect([false, false, false].reduce(xor, false)).to.eql(false);
    expect([false, false, false].reduce(xor, true)).to.eql(true);
    expect([true, false, false].reduce(xor)).to.eql(true);
    expect([false, true, false].reduce(xor)).to.eql(true);
    expect([false, false, true].reduce(xor)).to.eql(true);
    expect([false, true, true].reduce(xor)).to.eql(false);
    expect([true, false, true].reduce(xor)).to.eql(false);
    expect([true, true, false].reduce(xor)).to.eql(false);
    done();
  });
});
