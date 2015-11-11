var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var isInteger = require('../is-integer');

describe('isInteger', function () {
  it('should return true for integers', function(done) {
    expect(isInteger(0)).to.be.true();
    expect(isInteger(-1)).to.be.true();
    expect(isInteger(101.0)).to.be.true();
    done();
  });
  it('should return false for non-numbers and non-ints', function(done) {
    expect(isInteger(1.1)).to.be.false();
    expect(isInteger(2/3)).to.be.false();
    expect(isInteger(NaN)).to.be.false();
    expect(isInteger(false)).to.be.false();
    expect(isInteger(Math.Pi)).to.be.false();
    expect(isInteger(Math.Infinity)).to.be.false();
    expect(isInteger([])).to.be.false();
    expect(isInteger({})).to.be.false();
    expect(isInteger(/regex/)).to.be.false();
    done();
  });
});
