var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var defaults = require('../defaults');

describe('defaults', function () {
  it('should provide default values for an object', function(done) {
    var a = {
      foo: 1,
      bar: 4,
      qux: 3
    };

    var b = {
      foo: 0,
      bar: 2
    };

    var c = defaults(b, a);

    expect(c).to.eql({
      foo: 0,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should initialize a new target if one does not exist', function(done) {
    var a = null;

    var b = {
      foo: 1,
      bar: 2,
      qux: 3
    };

    var c = defaults(a, b);

    expect(c).to.eql({
      foo: 1,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should return target if source does not exist', function(done) {
    var a = null;

    var b = {
      foo: 1,
      bar: 2,
      qux: 3
    };

    var c = defaults(b, a);

    expect(c).to.eql({
      foo: 1,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should support partial functionality', function(done) {
    var a = {
      foo: 10
    };

    var b = {
      foo: 1,
      bar: 2,
      qux: 3
    };

    var partial = defaults(b);
    var c = partial(a);

    expect(c).to.eql({
      foo: 10,
      bar: 2,
      qux: 3
    });

    done();
  });
});
