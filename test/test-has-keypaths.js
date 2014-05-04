var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var beforeEach = Lab.beforeEach;
var afterEach = Lab.afterEach;
var expect = Lab.expect;
var isArray = Array.isArray;
var isObject = require('../is-object');
var isFunction = require('../is-function');

var hasKeypaths = require('../has-keypaths');

describe('hasKeypaths', function () {
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
    expect(hasKeypaths(obj, { foo: 1 })).to.equal(true);
    expect(hasKeypaths(obj, { foo: 1, bar: 2 })).to.equal(true);
    expect(hasKeypaths(obj, { foo: 1, bar: 2, qux: 3 })).to.equal(true);
    expect(hasKeypaths(obj, { bar: 2, qux: 3 })).to.equal(true);
    done();
  });
  it('should return false if the object doesn\'t have the properties (object)', function (done) {
    var obj = this.obj;
    expect(hasKeypaths(obj, { foo: 1, bar: 2, qux: 3, nope: 4 })).to.equal(false);
    expect(hasKeypaths(obj, { bar: 5 })).to.equal(false);
    expect(hasKeypaths(obj, { bar: 2, nope: 4 })).to.equal(false);
    expect(hasKeypaths()).to.equal(false);
    done();
  });
  it('should return true if the object has the properties (array)', function (done) {
    var obj = this.obj;
    expect(hasKeypaths(obj, ['foo'])).to.equal(true);
    expect(hasKeypaths(obj, ['foo', 'bar', 'qux'])).to.equal(true);
    done();
  });
  it('should return false if the object doesn\'t have the properties (array)', function (done) {
    var obj = this.obj;
    expect(hasKeypaths(obj, ['foo', 'bar', 'qux', 'nope'])).to.equal(false);
    expect(hasKeypaths(obj, ['nope'])).to.equal(false);
    done();
  });
  describe('deep equals', function() {
    beforeEach(function (done) {
      this.obj = {
        foo: {
          x: 1
        },
        bar: {
          x: {
            y: 1
          }
        },
        qux: 3
      };
      Object.getPrototypeOf(this.obj.bar).secret = true;
      done();
    });
    afterEach(function (done) {
      delete this.obj;
      done();
    });
    it('should return true if the object has the properties (object)', function (done) {
      var obj = this.obj;
      expect(hasKeypaths(obj, { foo: { x: 1 } })).to.equal(true);
      expect(hasKeypaths(obj, { 'foo.x': 1 })).to.equal(true);
      expect(hasKeypaths(obj, { 'foo.x': 1 }, true)).to.equal(true);
      expect(hasKeypaths(obj, { 'bar.x': { y: 1 } })).to.equal(true);
      expect(hasKeypaths(obj, { 'bar.x': { y: 1 } }, true)).to.equal(true);
      done();
    });
    it('should return false if the object doesn\'t have the properties (object)', function (done) {
      var obj = this.obj;
      expect(hasKeypaths(obj, { bar: { x: 5 } })).to.equal(false);
      expect(hasKeypaths(obj, { 'bar.x': 5 })).to.equal(false);
      expect(hasKeypaths(obj, { 'bar.x': 5 }, true)).to.equal(false);
      expect(hasKeypaths(obj, { 'bar.x': { y: 1 } }, false)).to.equal(false);
      done();
    });
    it('should return true if the object has the properties (array)', function (done) {
      var obj = this.obj;
      expect(hasKeypaths(obj, ['foo.x'])).to.equal(true);
      expect(hasKeypaths(obj, ['foo.x', 'bar', 'qux'])).to.equal(true);
      expect(hasKeypaths(obj, ['foo.x', 'bar.secret', 'qux'])).to.equal(true);
      expect(hasKeypaths(obj, ['foo.x', 'bar.secret', 'qux'], true)).to.equal(true);
      done();
    });
    it('should return false if the object doesn\'t have the properties (array)', function (done) {
      var obj = this.obj;
      expect(hasKeypaths(obj, ['foo.x', 'bar', 'qux', 'foo.nope'])).to.equal(false);
      expect(hasKeypaths(obj, ['foo.nope'])).to.equal(false);
      expect(hasKeypaths(obj, ['foo.x', 'bar.secret', 'qux'], false)).to.equal(false);
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
      expect(arr.map(hasKeypaths({ bar:1 }))).to.eql([true, true, true, true]);
      expect(arr.map(hasKeypaths({ qux:2 }))).to.eql([false, true, false, true]);
      done();
    });
    it('should return true for objects that have the properties (array)', function (done) {
      var arr = this.arr;
      expect(arr.map(hasKeypaths(['bar']))).to.eql([true, true, true, true]);
      expect(arr.map(hasKeypaths(['bar', 'qux']))).to.eql([false, true, false, true]);
      done();
    });
  });
});