var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var clone = require('clone');
var set = require('../set');
var pluck = require('../pluck');

describe('set', function () {
  it('should set a key with value on a object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };

    var key = 'bar';
    var val = 100;

    var expected = clone(obj);
    expected[key] = val;

    expect(set(obj, key, val)).to.deep.equal(expected);
    expect(obj[key]).to.equal(100); // original obj modified
    done();
  });
  it('should set a key with a val when used with array functions', function(done) {
    var objs = [
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
      },
      {
        foo: 3,
        bar: 3,
        koo: 3,
        goo: 3
      }
    ];
    var key = 'bar';
    var val = 100;
    var expected = objs.map(function (obj) {
      var out = clone(obj);
      out[key] = val;
      return out;
    });
    expect(objs.map(set(key, val))).to.deep.equal(expected);
    expect(objs.map(pluck(key))).to.deep.equal([100, 100, 100]); // original obj modified
    done();
  });
  it('should set a set of keys and vals when given an object', function (done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };

    var key = 'bar';
    var val = 100;
    var setObj = {};
    setObj[key] = val;

    var expected = clone(obj);
    expected[key] = val;

    expect(set(obj, setObj)).to.deep.equal(expected);
    expect(obj[key]).to.equal(100); // original obj modified
    done();
  });
  it('should set the right value when given an object and a keypath', function (done) {
    var obj = {
      foo: 1,
      qux: 1
    };

    var expected = {
      foo: 1,
      bar: {
        baz: 100
      },
      qux: 1
    };

    expect(set(obj, 'bar.baz', 100)).to.deep.equal(expected);
    expect(obj).to.deep.equal(expected);
    done();
  });
  it('should set the right value when given an object and a keypath object', function (done) {
    var obj = {
      foo: 1,
      qux: 1
    };

    var keypathObj = {
      'bar.baz' : 100,
      yolo: 1
    };

    var expected = {
      foo: 1,
      bar: {
        baz: 100
      },
      qux: 1,
      yolo: 1
    };
    expect(set(obj, keypathObj)).to.deep.equal(expected);
    expect(obj).to.deep.equal(expected);
    done();
  });
  it('should set a set of keys and vals when given an object when used with array functions', function (done) {
    var objs = [
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3,
        koo: 3,
        goo: 3
      }
    ];
    var key = 'bar';
    var val = 100;
    var setObj = {};
    setObj[key] = val;
    var expected = objs.map(function (obj) {
      var copy = clone(obj);
      copy[key] = val;
      return copy;
    });
    expect(objs.map(set(setObj))).to.deep.equal(expected);
    expect(objs.map(pluck(key))).to.deep.equal([100, 100, 100]); // original obj modified
    done();
  });
  describe('deep', function () {
    it('should set a deep keypath', function (done) {
      const obj = {
        // foo: 1,
        bar: 2
      }
      const out = set(obj, 'foo.qux', 100);
      expect(out).to.deep.equal({ foo: { qux: 100 }, bar: 2 });
      done();
    })
  })
  describe('errors', function() {
    it('should error when given two args that artent str, val or obj, obj', function (done) {
      try {
        set(/what/, /what/);
      }
      catch (err) {
        expect(err).to.exist();
        done();
      }
    });
  });
});
