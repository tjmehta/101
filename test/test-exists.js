var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var exists = require('../exists');

describe('exists', function () {
  it('should return true for existant vars', function(done) {
    expect(exists(['foo'])).to.be.true;
    expect(exists('foo')).to.be.true;
    expect(exists(101)).to.be.true;
    expect(exists({})).to.be.true;
    expect(exists(/re/)).to.be.true;
    expect(exists(true)).to.be.true;
    expect(exists(function () {})).to.be.true;
    done();
  });
  it('should return false for non-existant vars', function(done) {
    expect(exists(null)).to.be.false;
    expect(exists(undefined)).to.be.false;
    done();
  });
});