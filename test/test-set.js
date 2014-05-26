var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

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

    expect(set(obj, key, val)).to.eql(expected);
    expect(obj[key]).to.equal(100); // original obj modified
    done();
  });
  it('should pluck keys from objects in an array when used with map', function(done) {
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
    var expected = objs.map(function (obj) {
      var out = clone(obj);
      out[key] = val;
      return out;
    });
    expect(objs.map(set(key, val))).to.eql(expected);
    expect(objs.map(pluck('bar'))).to.eql([100, 100, 100]); // original obj modified
    done();
  });
});