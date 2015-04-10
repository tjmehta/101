var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var or = require('../or');

describe('or', function() {
  it('should work with reduce', function (done) {
    expect([true, true, true].reduce(or)).to.equal(true);
    expect([true, false, false].reduce(or)).to.equal(true);
    expect([false, false, false].reduce(or)).to.equal(false);
    done();
  });
});
