var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var pluck = require('../pluck');

describe('pluck', function () {
  it('should pluck a key from an object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    expect(pluck(obj, 'bar')).to.equal(1);
    expect(pluck(obj, ['bar'])).to.equal(1);
    expect(pluck(obj)).to.equal(undefined);
    expect(pluck(obj, [])).to.equal(undefined);
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
    expect(objs.map(pluck('bar'))).to.eql([
      1,
      2,
      3
    ]);
    expect(objs.map(pluck(['bar']))).to.eql([
      1,
      2,
      3
    ]);
    expect(objs.map(pluck())).to.eql([
      undefined, undefined, undefined
    ]);
    expect(objs.map(pluck([]))).to.eql([
      undefined, undefined, undefined
    ]);
    done();
  });
  describe('isKeypath', function() {
    var objs = [{
      foo: {
        bar: 1
      },
      'foo.bar': 2
    }];
    var obj = objs[0];
    describe('true and default', function (done) {
      it('should pluck a keypath from an object', function (done) {
        expect(pluck(obj, 'foo.bar')).to.equal(1);
        expect(pluck(obj, 'foo.bar', true)).to.equal(1);
        done();
      });
      it('should pluck keypaths from objects in an array when used with map', function (done) {
        expect(objs.map(pluck('foo.bar'))).to.eql([1]);
        expect(objs.map(pluck('foo.bar', true))).to.eql([1]);
        done();
      });
    });
    describe('false', function (done) {
      it('should pluck a key from an object', function (done) {
        expect(pluck(obj, 'foo.bar', false)).to.equal(2);
        done();
      });
      it('should pluck keys from objects in an array when used with map', function (done) {
        expect(objs.map(pluck('foo.bar', false))).to.eql([2]);
        done();
      });
    });
  });
});