var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var omit = require('../omit');

describe('omit', function () {
  it('should omit keys from an object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    expect(omit(obj, 'bar')).to.deep.equal({
      foo: 1,
      qux: 1
    });
    expect(omit(obj, ['bar'])).to.deep.equal({
      foo: 1,
      qux: 1
    });
    expect(omit(obj, 'foo', 'bar')).to.deep.equal({
      qux: 1,
    });
    expect(omit(obj, ['foo', 'bar'])).to.deep.equal({
      qux: 1,
    });
    expect(omit(obj, ['foo', 'bar'], 'qux')).to.deep.equal({});
    expect(omit(obj, ['foo', 'bar'], ['qux'])).to.deep.equal({});
    expect(omit(obj)).to.deep.equal(obj);
    expect(omit(obj, [])).to.deep.equal(obj);
    done();
  });
  it('should omit keys from objects in an array when used with map', function(done) {
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
    expect(objs.map(omit('bar'))).to.deep.equal([
      {},
      {
        foo: 2,
        qux: 2
      },
      {
        foo: 3,
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit(['bar']))).to.deep.equal([
      {},
      {
        foo: 2,
        qux: 2
      },
      {
        foo: 3,
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit('foo', 'bar'))).to.deep.equal([
      {},
      {
        qux: 2
      },
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit(['foo', 'bar']))).to.deep.equal([
      {},
      {
        qux: 2
      },
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit(['foo', 'bar'], 'qux'))).to.deep.equal([
      {},
      {},
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit(['foo', 'bar'], ['qux']))).to.deep.equal([
      {},
      {},
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit())).to.deep.equal(objs);
    expect(objs.map(omit([]))).to.deep.equal(objs);
    done();
  });
});
