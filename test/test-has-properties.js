var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var beforeEach = Lab.beforeEach;
var afterEach = Lab.afterEach;
var expect = Lab.expect;
var isArray = Array.isArray;
var isObject = require('../is-object');
var isFunction = require('../is-function');
var last = require('../last');

var hasProperties = require('../has-properties');

describe('hasProperties', function () {
  beforeEach(function (done) {
    this.obj = {
      foo: 1,
      bar: 2,
      qux: 3
    };
    done();
  });
  afterEach(function (done) {
    delete this.obj;
    done();
  });
  it('should return true if the object has the properties (object)', function (done) {
    var obj = this.obj;
    expect(hasProperties(obj, { foo: 1 })).to.equal(true);
    expect(hasProperties(obj, { foo: 1, bar: 2 })).to.equal(true);
    expect(hasProperties(obj, { foo: 1, bar: 2, qux: 3 })).to.equal(true);
    expect(hasProperties(obj, { bar: 2, qux: 3 })).to.equal(true);
    done();
  });
  it('should return false if the object doesn\'t have the properties (object)', function (done) {
    var obj = this.obj;
    expect(hasProperties(obj, { foo: 1, bar: 2, qux: 3, nope: 4 })).to.equal(false);
    expect(hasProperties(obj, { bar: 5 })).to.equal(false);
    expect(hasProperties(obj, { bar: 2, nope: 4 })).to.equal(false);
    expect(hasProperties()).to.equal(false);
    done();
  });
  it('should return true if the object has the properties (array)', function (done) {
    var obj = this.obj;
    expect(hasProperties(obj, ['foo'])).to.equal(true);
    expect(hasProperties(obj, ['foo', 'bar', 'qux'])).to.equal(true);
    done();
  });
  it('should return false if the object doesn\'t have the properties (array)', function (done) {
    var obj = this.obj;
    expect(hasProperties(obj, ['foo', 'bar', 'qux', 'nope'])).to.equal(false);
    expect(hasProperties(obj, ['nope'])).to.equal(false);
    done();
  });
  describe('deep equals', function() {
    beforeEach(function (done) {
      this.obj = {
        foo: {
          x: 1
        },
        bar: 2,
        qux: 3
      };
      done();
    });
    afterEach(function (done) {
      delete this.obj;
      done();
    });
    it('should return true if the object has the properties (object)', function (done) {
      var obj = this.obj;
      expect(hasProperties(obj, { foo: { x: 1 } })).to.equal(true);
      expect(hasProperties(obj, { foo: { x: 1 } }, true)).to.equal(true);
      done();
    });
    it('should return false if the object doesn\'t have the properties (object)', function (done) {
      var obj = this.obj;
      expect(hasProperties(obj, { foo: { x: 1 } }, false)).to.equal(false);
      expect(hasProperties(obj, { bar: { x: 5 } })).to.equal(false);
      done();
    });
  });
  describe('works with array functions like map', function() {
    beforeEach(function (done) {
      this.arr = [
        {
          bar: 1
        },
        {
          foo: 2,
          bar: 1,
          qux: 2
        },
        {
          foo: 3,
          bar: 1,
          koo: 3,
          goo: 3
        },
        {
          foo: 3,
          bar: 1,
          qux: 2
        },
        {
          foo: {
            x: 1
          },
          bar: 1
        }
      ];
      done();
    });
    afterEach(function (done) {
      delete this.arr;
      done();
    });
    it('should return true for objects that have the properties (object)', function (done) {
      var arr = this.arr;
      expect(arr.map(hasProperties({ bar:1 }))).to.eql([true, true, true, true, true]);
      expect(arr.map(hasProperties({ qux:2 }))).to.eql([false, true, false, true, false]);
      expect(arr.map(hasProperties({ foo: { x: 1 } }))).to.eql([false, false, false, false, true]);
      expect(arr.map(hasProperties({ foo: { x: 1 } }, true))).to.eql([false, false, false, false, true]);
      expect(arr.map(hasProperties({ foo: { x: 1 } }, false))).to.eql([false, false, false, false, false]);
      expect(arr.map(hasProperties({ foo: last(arr).foo }, false))).to.eql([false, false, false, false, true]);
      done();
    });
    it('should return true for objects that have the properties (array)', function (done) {
      var arr = this.arr;
      expect(arr.map(hasProperties(['bar']))).to.eql([true, true, true, true, true]);
      expect(arr.map(hasProperties(['bar', 'qux']))).to.eql([false, true, false, true, false]);
      arr.forEach(function (obj) {
        Object.getPrototypeOf(obj).qux = 1;
      });
      expect(arr.map(hasProperties(['bar', 'qux']))).to.eql([true, true, true, true, true]);
      expect(arr.map(hasProperties(['bar', 'qux'], true))).to.eql([true, true, true, true, true]);
      expect(arr.map(hasProperties(['bar', 'qux'], false))).to.eql([false, true, false, true, false]);
      done();
    });
  });
});