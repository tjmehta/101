var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var isBoolean = require('../is-boolean');

describe('isBoolean', function () {
  it('should return true for booleans', function(done) {
    expect(isBoolean(true)).to.be.true;
    done();
  });
  it('should return false for non-booleans', function(done) {
    expect(isBoolean(['foo'])).to.be.false;
    expect(isBoolean('foo')).to.be.false;
    expect(isBoolean(101)).to.be.false;
    expect(isBoolean({})).to.be.false;
    expect(isBoolean(function () {})).to.be.false;
    expect(isBoolean(/re/)).to.be.false;
    expect(isBoolean(null)).to.be.false;
    expect(isBoolean(undefined)).to.be.false;
    done();
  });
});