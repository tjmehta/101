var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var last = require('../last');

describe('last', function () {
  it('should return the last a val from an array, string, or object', function(done) {
    expect(last([1, 2, 3])).to.equal(3);
    expect(last('123')).to.equal('3');
    expect(last(function (a) {})).to.equal('}');
    expect(last(null)).to.equal(undefined);
    done();
  });
});