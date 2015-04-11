var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var first = require('../first');

describe('first', function () {
  it('should return the first a val from an array, string, or object', function(done) {
    expect(first([1, 2, 3])).to.equal(1);
    expect(first('123')).to.equal('1');
    expect(first(function (a) {})).to.equal('f');
    expect(first(null)).to.equal(undefined);
    done();
  });
});
