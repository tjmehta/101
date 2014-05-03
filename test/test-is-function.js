var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var isFunction = require('../is-function');

describe('isFunction', function () {
  it('should return true for functions', function(done) {
    expect(isFunction(function () {})).to.be.true;
    done();
  });
  it('should return false for non-functions', function(done) {
    expect(isFunction(['foo'])).to.be.false;
    expect(isFunction('foo')).to.be.false;
    expect(isFunction(101)).to.be.false;
    expect(isFunction({})).to.be.false;
    expect(isFunction(/re/)).to.be.false;
    expect(isFunction(true)).to.be.false;
    expect(isFunction(null)).to.be.false;
    expect(isFunction(undefined)).to.be.false;
    done();
  });
});