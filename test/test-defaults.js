var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var defaults = require('../defaults');

describe('defaults', function () {
  it('should provide default values for an object', function (done) {
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

    expect(c).to.deep.equal({
      foo: 0,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should allow defaults in sub objects', function (done) {
    var a = {
      qux: {
        one: 1,
        two: 2
      },
      foo: {
        bar: true
      },
      empty: false
    };

    var b = {
      qux: {
        two: 3,
        three: 3
      },
      baz: {
        buz: false
      },
      empty: {}
    };

    var c = defaults(b, a);

    expect(c).to.deep.equal({
      qux: {
        one: 1,
        two: 3,
        three: 3
      },
      foo: {
        bar: true
      },
      baz: {
        buz: false
      },
      empty: {}
    });

    done();
  });

  it('should initialize a new target if one does not exist', function (done) {
    var a = null;

    var b = {
      foo: 1,
      bar: 2,
      qux: 3
    };

    var c = defaults(a, b);

    expect(c).to.deep.equal({
      foo: 1,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should return target if source does not exist', function (done) {
    var a = null;

    var b = {
      foo: 1,
      bar: 2,
      qux: 3
    };

    var c = defaults(b, a);

    expect(c).to.deep.equal({
      foo: 1,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should support partial functionality', function (done) {
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

    expect(c).to.deep.equal({
      foo: 10,
      bar: 2,
      qux: 3
    });

    done();
  });
});
