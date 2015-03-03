var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;
var clone = require('clone');
var del = require('../del');
var pluck = require('../pluck');

describe('del', function () {
  it('should del a key with value on a object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };

    var key = 'bar';

    var expected = clone(obj);
    delete expected[key];

    expect(del(obj, key)).to.eql(expected);
    expect(obj[key]).to.eql(undefined); // original obj modified
    done();
  });
  it('should support keypaths', function(done) {
    var obj = {
      foo: {
        moo: 1,
        boo: 2
      },
      bar: 1,
      qux: 1
    };

    var key = 'foo.moo';

    var expected = clone(obj);
    delete expected.foo.moo;

    expect(del(obj, key)).to.eql(expected);
    expect(obj.foo.moo).to.eql(undefined); // original obj modified
    done();
  });
  it('should del a set of keys when given an array', function (done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };

    var delKeys = ['foo', 'bar'];

    var expected = clone(obj);
    delete expected.foo;
    delete expected.bar;

    expect(del(obj, delKeys)).to.eql(expected);
    expect(obj.foo).to.equal(undefined); // original obj modified
    expect(obj.bar).to.equal(undefined); // original obj modified
    done();
  });
  it('should del a set of keys when given an array when used with array functions', function (done) {
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

    var delKeys = ['foo', 'bar'];

    var expected = objs.map(function (obj) {
      var copy = clone(obj);
      delete copy.foo;
      delete copy.bar;
      return copy;
    });
    expect(objs.map(del(delKeys))).to.eql(expected);
    expect(objs.map(pluck('foo'))).to.eql([undefined, undefined, undefined]); // original obj modified
    done();
  });
  describe('errors', function() {
    it('should error when given two args that artent str, val or obj, obj', function (done) {
      try {
        del(/what/, /what/);
      }
      catch (err) {
        expect(err).to.be.ok;
        done();
      }
    });
  });
});
