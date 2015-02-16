var Lab = require('lab');
var curry = require('../curry');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var expect = Lab.expect;

describe('curry', function() {
  var x, y, f, g, h;

  beforeEach(function(done) {
    var slice = Array.prototype.slice;

    f = function(a) {
      return a;
    };

    g = function(a, b) {
      return a + b;
    };

    h = function() {
      return slice.call(arguments).join();
    };

    x = Math.random();
    y = Math.random();

    done();
  });

  it('curry(f)(1) should be identical to f(1)', function(done) {
    var expected = f(x);
    var curryF = curry(f);
    var actual = curryF(x);
    expect(actual).to.eql(expected);
    done();
  });

  it('curry(g)(1)(2) should be identical to g(1, 2)', function(done) {
    var expected = g(x, y);
    var curryG = curry(g);
    var actual = curryG(x)(y);
    expect(actual).to.eql(expected);
    done();
  });

  it('curry(g)(1, 2) should be identical to g(1, 2)', function(done) {
    var expected = g(x, y);
    var curryG = curry(g);
    var actual = curryG(x, y);
    expect(actual).to.eql(expected);
    done();
  });

  it('curry(h, 3)(1, 2, 3) should be identical to h(1, 2, 3)', function(done) {
    var expected = h(x, y, y);
    var curryH = curry(h, 3);
    var actual = curryH(x, y, y);
    expect(actual).to.eql(expected);
    done();
  });
});
