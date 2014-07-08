var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var clone = require('../clone');

describe('clone', function () {
  it('should clone an object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    expect(clone(obj)).to.eql({
      foo: 1,
      bar: 1,
      qux: 1
    });
    done();
  });
});
