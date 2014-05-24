var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var beforeEach = Lab.beforeEach;
var afterEach = Lab.afterEach;
var expect = Lab.expect;
var isArray = Array.isArray;
var isObject = require('../is-object');
var isFunction = require('../is-function');

var find = require('../find');

describe('find', function () {
  beforeEach(function (done) {
    this.arr = [
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      [],
      {
        foo: 3,
        bar: 3,
        koo: 3,
        goo: 3
      }
    ];
    this.str = 'hello';
    done();
  });
  afterEach(function (done) {
    delete this.arr;
    delete this.str;
    done();
  });
  it('should return -1 in an empty list', function (done) {
    var arr = [];
    expect(find(arr, function (v) { return v === 1; })).to.eql(null);
    done();
  });
  it('should get the index of an item in an array/string that passes a given function', function (done) {
    var arr = this.arr;
    expect(find(arr, isObject)).to.equal(arr[0]);
    expect(find(arr, isArray)).to.equal(arr[2]);
    expect(find(arr, isFunction)).to.eql(null);
    done();
  });
  it('should get the index of an item in an array/string that passes a given function when used with map', function (done) {
    var arr = this.arr;
    expect([arr].map(find(isObject))).to.eql([arr[0]]);
    expect([arr].map(find(isArray))).to.eql([arr[2]]);
    expect([arr].map(find(isFunction))).to.eql([null]);
    done();
  });
  it('should error when given invalid arguments', function (done) {
    try {
      find({});
    }
    catch (err) {
      expect(err.message).to.equal('first argument must be a list (have length) or function');
    }
    try {
      find();
    }
    catch (err) {
      expect(err.message).to.equal('first argument must be a list (have length) or function');
    }
    try {
      find(this.arr, {});
    }
    catch (err) {
      expect(err.message).to.equal('predicate must be a function');
    }
    try {
      find(isArray)({});
    }
    catch (err) {
      expect(err.message).to.equal('list must have length property');
    }
    try {
      find(isArray)();
    }
    catch (err) {
      expect(err.message).to.equal('list must have length property');
    }
    done();
  });
});
