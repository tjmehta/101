var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var restParam = require('../rest-param');

describe('rest-param', function () {
  it('should append an array with the rest params to a function', function(done) {
    restParam(function(rest) {
      expect(rest).to.deep.equal([1, 2, 3]);
    })(1, 2, 3);

    restParam(function(a, rest) {
      expect(a).to.equal(1);
      expect(rest).to.deep.equal([2, 3]);
    })(1, 2, 3);

    restParam(function(a, b, rest) {
      expect(a).to.equal(1);
      expect(b).to.equal(2);
      expect(rest).to.deep.equal([3, 4]);
    })(1, 2, 3, 4);

    restParam(function(a, b, rest) {
      expect(a).to.equal(1);
      expect(b).to.equal(2);
      expect(rest).to.deep.equal([]);
    })(1, 2);

    restParam(function(a, b, rest) {
      expect(a).to.equal(1);
      expect(b).to.equal(undefined);
      expect(rest).to.deep.equal([]);
    })(1);

    restParam(function(a, b, rest) {
      expect(a).to.equal(undefined);
      expect(b).to.equal(undefined);
      expect(rest).to.deep.equal([]);
    })();

    done();
  });
});
