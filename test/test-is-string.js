var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var isString = require('../is-string');

describe('isString', function () {
  it('should return true for numbers', function(done) {
    expect(isString('foo')).to.be.true;
    expect(isString(new String('hey'))).to.be.true;
    done();
  });
  it('should return false for non-numbers', function(done) {
    expect(isString(['foo'])).to.be.false;
    expect(isString(function () {})).to.be.false;
    expect(isString(101)).to.be.false;
    expect(isString({})).to.be.false;
    expect(isString(/re/)).to.be.false;
    expect(isString(true)).to.be.false;
    expect(isString(null)).to.be.false;
    expect(isString(undefined)).to.be.false;
    expect(isString(new Number(101))).to.be.false;
    done();
  });
});