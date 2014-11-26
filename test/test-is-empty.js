var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var isEmpty = require('../is-empty');

describe('isEmpty', function () {
  it('should return true for empty object', function(done) {
      expect(isEmpty([])).to.be.true;
      expect(isEmpty("")).to.be.true;
      expect(isEmpty(" ")).to.be.true;
      expect(isEmpty({})).to.be.true;
      done();
  });
  it('should return false for non-empty-object', function(done) {
      expect(isEmpty({x : "y"})).to.be.false;
      expect(isEmpty("a")).to.be.false;
      expect(isEmpty(" a")).to.be.false;
      expect(isEmpty([1])).to.be.false;
      done();
  });
  it('should error when given invalid arguments', function (done) {
      try {
          isEmpty(function() {});
      }
      catch (err) {
          expect(err.message).to.equal('first argument must be a string, object or array');
      }
      try {
          isEmpty();
      }
      catch (err) {
          expect(err.message).to.equal('first argument must be a string, object or array');
      }
      done();
  });
});
