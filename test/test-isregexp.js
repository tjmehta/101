var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var isRegExp = require('../is-regexp');

describe('isRegExp', function () {
  it('should return true for instance of RegExp', function(done) {
    var regexp = new RegExp('.*');
    expect(isRegExp(regexp)).to.be.true;
    expect(isRegExp(/.*/)).to.be.true;
    done();
  });

  it('should return false for non-regexp', function(done) {
    expect(isRegExp({})).to.be.false;
    expect(isRegExp(['foo'])).to.be.false;
    expect(isRegExp('foo')).to.be.false;
    expect(isRegExp(101)).to.be.false;
    expect(isRegExp(function () {})).to.be.false;
    expect(isRegExp(null)).to.be.false;
    expect(isRegExp(undefined)).to.be.false;
    expect(isRegExp(new String('hey'))).to.be.false;
    expect(isRegExp(new Number(101))).to.be.false;
    done();
  });
});
