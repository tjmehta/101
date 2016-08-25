var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var isArray = require('../is-array');

describe('isArray', function () {
  it('should return true for arrays', function(done) {
    expect(isArray([])).to.be.true();
    expect(isArray(['hello'])).to.be.true();
    done();
  });

  it('should return false for non-arrays', function(done) {
    expect(isArray({})).to.be.false();
    expect(isArray(arguments)).to.be.false();
    expect(isArray('string')).to.be.false();
    expect(isArray(/regexp/)).to.be.false();
    expect(isArray(true)).to.be.false();
    expect(isArray(false)).to.be.false();
    expect(isArray(null)).to.be.false();
    expect(isArray(undefined)).to.be.false();
    expect(isArray()).to.be.false();
    done();
  });
});
