var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var isEmptyObject = require('../is-empty-object');

describe('isEmptyObject', function () {
  it('should return true for empty object', function(done) {
    expect(isEmptyObject({})).to.be.true;
    done();
  });
  it('should return false for non-empty-object', function(done) {
    expect(isEmptyObject({x : "y"})).to.be.false;
    expect(isEmptyObject("xyz")).to.be.false;
    done();
  });
});
