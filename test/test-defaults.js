var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var defaults = require('../defaults');

describe('defaults', function () {
  it('should provide default values for an object', function (done) {
    var d = {
      foo: 1,
      bar: 4,
      qux: 3
    };

    var o = {
      foo: 0,
      bar: 2
    };

    var c = defaults(o, d);

    expect(c).to.deep.equal({
      foo: 0,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should not default deep objects w/o flag', function (done) {
    var d = {
      qux: {
        one: 1,
        two: 2
      },
      foo: {
        bar: true
      },
      empty: false
    };

    var o = {
      qux: {
        two: 3,
        three: 3
      },
      baz: {
        buz: false
      },
      empty: {}
    };

    var c = defaults(o, d);

    expect(c).to.deep.equal({
      qux: {
        // one is skipped (in object)
        two: 3, // set in the initial object
        three: 3 // in the target (not from defaults)
      },
      baz: {
        buz: false // object from default
      },
      foo: {
        bar: true // object from default
      },
      empty: {} // set in initial object
    });

    done();
  });

  it('should allow defaults in sub objects with deep flag', function (done) {
    var d = {
      qux: {
        one: 1,
        two: 2
      },
      foo: {
        bar: true
      },
      empty: false
    };

    var o = {
      qux: {
        two: 3,
        three: 3
      },
      baz: {
        buz: false
      },
      empty: {}
    };

    var c = defaults(o, d, true);

    expect(c).to.deep.equal({
      qux: {
        one: 1, // from defaults
        two: 3, // set in the set value (but in default)
        three: 3 // in the target (not from defaults)
      },
      foo: {
        bar: true // object from default
      },
      baz: {
        buz: false // object from default
      },
      empty: {} // target object, primitive default
    });

    done();
  });

  it('should initialize a new target if one does not exist', function (done) {
    var o = null;

    var d = {
      foo: 1,
      bar: 2,
      qux: 3
    };

    var c = defaults(o, d);

    expect(c).to.deep.equal({
      foo: 1,
      bar: 2,
      qux: 3
    });

    done();
  });

  it('should return target if source does not exist', function (done) {
    var d = null;

    var o = {
      foo: 1,
      bar: 2,
      qux: 3
    };

    var c = defaults(o, d);

    expect(c).to.deep.equal({
      foo: 1,
      bar: 2,
      qux: 3
    });

    done();
  });

  describe('should support partial functionality', function () {
    it('should work basically', function (done) {
      var o = {
        foo: 10
      };

      var d = {
        foo: 1,
        bar: 2,
        qux: 3
      };

      var partial = defaults(d);
      var c = partial(o);

      expect(c).to.deep.equal({
        foo: 10,
        bar: 2,
        qux: 3
      });

      done();
    });

    it('should work with deep flag', function (done) {
      var o = {
        foo: {
          one: 1,
          two: 2
        }
      };

      var d = {
        foo: {
          one: 100,
          three: 300
        },
        bar: true
      };

      var partial = defaults(d, true);
      var c = partial(o);

      expect(c).to.deep.equal({
        foo: {
          one: 1,
          two: 2,
          three: 300
        },
        bar: true
      });

      done();
    });
  });

});
