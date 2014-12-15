var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var isNumber = require('../is-number');

describe('isNumber', function () {
  it('should return true for numbers', function(done) {
    expect(isNumber(101)).to.be.true;
    expect(isNumber(new Number(101))).to.be.true;
    done();
  });
  it('should return false for non-numbers', function(done) {
    expect(isNumber(true)).to.be.false;
    expect(isNumber(['foo'])).to.be.false;
    expect(isNumber('foo')).to.be.false;
    expect(isNumber({})).to.be.false;
    expect(isNumber(function () {})).to.be.false;
    expect(isNumber(/re/)).to.be.false;
    expect(isNumber(null)).to.be.false;
    expect(isNumber(undefined)).to.be.false;
    expect(isNumber(new String('hey'))).to.be.false;
    done();
  });
});