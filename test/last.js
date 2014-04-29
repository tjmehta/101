var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var last = require('../last');

describe('last', function () {
  it('should return the last a val from an array, string, or object', function(done) {
    expect(last([1, 2, 3])).to.equal(3);
    expect(last('123')).to.equal('3');
    expect(last({
      foo: 1,
      bar: 2,
      qux: 3
    })).to.equal(3);
    expect(last(function (a) {})).to.equal('}');
    expect(last(null)).to.equal(undefined);
    done();
  });
});