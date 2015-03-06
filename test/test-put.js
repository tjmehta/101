var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;
var clone = require('clone');
var put = require('../put');

describe('put', function () {
  it('should put a value at a key on a new object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };

    var key = 'bar';
    var val = 100;

    var original = clone(obj);

    var expected = clone(obj);
    expected[key] = val;

    expect(put(obj, key, val)).to.eql(expected);
    expect(obj).to.deep.equal(original); // original not modified
    done();
  });

  it('should put a value at a key when used with array functions', function(done) {
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

    var originals = clone(objs);

    var expected = objs.map(function (obj) {
      var out = clone(obj);
      out[key] = val;
      return out;
    });
    expect(objs.map(put(key, val))).to.eql(expected);
    expect(objs).to.eql(originals); // original not modified
    done();
  });

  describe('errors', function() {
    it('should error when given two args other than {string|number}, val', function (done) {
      try {put(/whatever/, /whatever/);}
      catch (err) {expect(err).to.be.ok;}
      done();
    });

    it('should error when given no args, one arg, or more than three args', function (done) {
      try {put();}
      catch (err) {expect(err).to.be.ok;}
      try {put(1);}
      catch (err) {expect(err).to.be.ok;}
      try {put(1, 3, 3, 4);}
      catch (err) {expect(err).to.be.ok;}
      done();
    });
  });
});
