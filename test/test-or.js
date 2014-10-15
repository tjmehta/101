var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var or = require('../or');

describe('or', function() {
  it('should work with reduce', function (done) {
    expect([true, true, true].reduce(or)).to.eql(true);
    expect([true, false, false].reduce(or)).to.eql(true);
    expect([false, false, false].reduce(or)).to.eql(false);
    done();
  });
});