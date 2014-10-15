var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var and = require('../and');

describe('and', function() {
  it('should work with reduce', function (done) {
    expect([true, true, false].reduce(and)).to.eql(false);
    expect([true, true, true].reduce(and)).to.eql(true);
    done();
  });
});