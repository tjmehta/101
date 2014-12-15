var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
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
    expect(isBoolean(new String('hey'))).to.be.false;
    expect(isBoolean(new Number(101))).to.be.false;
    done();
  });
});