var Lab = require('lab');
var compose = require('../compose');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

describe('compose', function() {
  it('compose(f, g)(x) should be identical to f(g(x))', function(done) {
    var f = function(x) { return x * x; }
    var g = function(x) { return x / 5; }
    var x = Math.random();
    var expected = f(g(x));
    var composed = compose(f, g);
    var actual = composed(x);
    expect(actual).to.eql(expected);
    done();
  });

  it('compose(f, sum)(x, y) should be identical to f(sum(x, y))', function(done) {
    var f = function(x) { return x * x; }
    var sum = function(x, y) { return x + y; }
    var x = Math.random();
    var y = Math.random();
    var expected = f(sum(x, y));
    var composed = compose(f, sum);
    var actual = composed(x, y);
    expect(actual).to.eql(expected);
    done();
  });


  it('compose(f, g)(x) should be identical to [x].map(g).map(f)[0]', function(done) {
    var f = function(x) { return -x; }
    var g = function(x) { return x * 5; }
    var x = Math.random();
    var expected = [x].map(g).map(f)[0];
    var composed = compose(f, g);
    var actual = composed(x);
    expect(actual).to.eql(expected);
    done();
  });

  it('[f,g].reduce(compose) should be identical to f(g(x))', function(done) {
    var f = function(x) { return x + x; }
    var g = function(x) { return x - 9; }
    var x = Math.random();
    var expected = f(g(x));
    var composed = [f,g].reduce(compose);
    var actual = composed(x);
    expect(actual).to.eql(expected);
    done();
  });
});
