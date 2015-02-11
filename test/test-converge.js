var Lab = require('lab');
var converge = require('../converge');
var compose = require('../compose');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var expect = Lab.expect;

describe('converge', function() {
  var add, f, g, h, x;

  beforeEach(function(done) {
    add = function(a, b) { return a + b; };
    f = function(x) { return x * x; };
    g = function(x) { return x / 5; };
    h = function(x) { return x + 5; };
    x = Math.random();
    done();
  });

  it('converge(f, [g])(x) should be identical to f(g(x))', function(done) {
    var expected = f(g(x));
    var converged = converge(f, [g]);
    var actual = converged(x);
    expect(actual).to.eql(expected);
    done();
  });

  it('converge(add, [g, h])(x) should be identical to add(g(x), h(x))', function(done) {
    var expected = add(g(x), h(x));
    var converged = converge(add, [g, h]);
    var actual = converged(x);
    expect(actual).to.eql(expected);
    done();
  });

  it('[f, converge(add, [f, g]), h].reduce(compose) should be identical to f(add(f(h(x)), g(h(x))))', function(done) {
    var expected = f(add(f(h(x)), g(h(x))));
    var converged = [f, converge(add, [f, g]), h].reduce(compose);
    var actual = converged(x);
    expect(actual).to.eql(expected);
    done();
  });
});
