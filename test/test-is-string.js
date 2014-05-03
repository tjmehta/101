var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var isString = require('../is-string');

describe('isString', function () {
  it('should return true for strings', function(done) {
    expect(isString('foo')).to.be.true;
    done();
  });
  it('should return false for non-strings', function(done) {
    expect(isString(['foo'])).to.be.false;
    expect(isString(function () {})).to.be.false;
    expect(isString(101)).to.be.false;
    expect(isString({})).to.be.false;
    expect(isString(/re/)).to.be.false;
    expect(isString(true)).to.be.false;
    expect(isString(null)).to.be.false;
    expect(isString(undefined)).to.be.false;
    done();
  });
});