var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var and = require('../and');

describe('and', function() {
  it('should work with reduce', function (done) {
    expect([true, true, false].reduce(and)).to.eql(false);
    expect([true, true, true].reduce(and)).to.eql(true);
    done();
  });
});