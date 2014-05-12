var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var or = require('../or');

describe('or', function() {
  it('should work with reduce', function (done) {
    expect([true, true, true].reduce(or)).to.eql(true);
    expect([true, false, false].reduce(or)).to.eql(true);
    expect([false, false, false].reduce(or)).to.eql(false);
    done();
  });
});