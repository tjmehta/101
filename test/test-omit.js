var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var omit = require('../omit');

describe('omit', function () {
  it('should omit keys from an object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    expect(omit(obj, 'bar')).to.eql({
      foo: 1,
      qux: 1
    });
    expect(omit(obj, ['bar'])).to.eql({
      foo: 1,
      qux: 1
    });
    expect(omit(obj, 'foo', 'bar')).to.eql({
      qux: 1,
    });
    expect(omit(obj, ['foo', 'bar'])).to.eql({
      qux: 1,
    });
    expect(omit(obj, ['foo', 'bar'], 'qux')).to.eql({});
    expect(omit(obj, ['foo', 'bar'], ['qux'])).to.eql({});
    expect(omit(obj)).to.eql(obj);
    expect(omit(obj, [])).to.eql(obj);
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
    expect(objs.map(omit('bar'))).to.eql([
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
    expect(objs.map(omit(['bar']))).to.eql([
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
    expect(objs.map(omit('foo', 'bar'))).to.eql([
      {},
      {
        qux: 2
      },
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit(['foo', 'bar']))).to.eql([
      {},
      {
        qux: 2
      },
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit(['foo', 'bar'], 'qux'))).to.eql([
      {},
      {},
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit(['foo', 'bar'], ['qux']))).to.eql([
      {},
      {},
      {
        koo: 3,
        goo: 3
      }
    ]);
    expect(objs.map(omit())).to.eql(objs);
    expect(objs.map(omit([]))).to.eql(objs);
    done();
  });
});
