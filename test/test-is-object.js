var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var isObject = require('../is-object');

describe('isObject', function () {
  it('should return true for objects', function(done) {
    expect(isObject({foo:'bar'})).to.be.true;
    done();
  });
  it('should return false for non-objects', function(done) {
    expect(isObject(['foo'])).to.be.false;
    expect(isObject('foo')).to.be.false;
    expect(isObject(101)).to.be.false;
    expect(isObject(function () {})).to.be.false;
    expect(isObject(/re/)).to.be.false;
    expect(isObject(null)).to.be.false;
    expect(isObject(undefined)).to.be.false;
    expect(isObject(new String('hey'))).to.be.false;
    expect(isObject(new Number(101))).to.be.false;
    done();
  });
});