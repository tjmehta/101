var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;
var clone = require('../clone');
var put = require('../put');
var set = require('../set');

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

  it('should put a key-value set on a new object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };

    var key = 'bar';
    var val = 100;
    var putObj = set({}, key, val);

    var original = clone(obj);

    var expected = clone(obj);
    expected[key] = val;

    expect(put(obj, putObj)).to.eql(expected);
    expect(obj).to.deep.equal(original); // original not modified
    done();
  });

  it('should put a key-value set when used with array functions', function(done) {
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
    var putObj = set({}, key, val);

    var originals = clone(objs);

    var expected = objs.map(function (obj) {
      var out = clone(obj);
      out[key] = val;
      return out;
    });
    expect(objs.map(put(putObj))).to.eql(expected);
    expect(objs).to.eql(originals); // original not modified
    done();
  });

  it("shouldn't change the type of the object", function(done) {
    var obj = new Date();

    var key = 'bar';
    var val = 100;

    var expected = clone(obj);
    expected[key] = val;

    var result = put(obj, key, val);
    expect(result).to.eql(expected);
    expect(result instanceof Date).to.be.ok;
    done();
  });

  describe('errors', function() {
    it('should error when given two args other than (key, value) or (obj, putObj)', function (done) {
      try {put(/whatever/, /whatever/);}
      catch (err) {expect(err).to.be.ok;}
      done();
    });

    it('should error when given no args', function (done) {
      try {put();}
      catch (err) {expect(err).to.be.ok;}
      done();
    });

    it('should error when one arg other than putObj', function (done) {
      try {put("anything");}
      catch (err) {expect(err).to.be.ok;}
      done();
    });
  });
});
