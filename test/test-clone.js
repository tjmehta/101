var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var clone = require('../clone');

// very simple test primarily checking exportation, see npm `clone` module...
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
