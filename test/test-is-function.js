var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
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
    expect(isFunction(new String('hey'))).to.be.false;
    expect(isFunction(new Number(101))).to.be.false;
    done();
  });
});