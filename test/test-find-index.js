var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var expect = Lab.expect;
var isArray = Array.isArray;
var isObject = require('../is-object');
var isFunction = require('../is-function');

var findIndex = require('../find-index');

describe('findIndex', function () {
  var ctx = {};
  beforeEach(function (done) {
    ctx.arr = [
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
    ctx.str = 'hello';
    done();
  });
  afterEach(function (done) {
    delete ctx.arr;
    delete ctx.str;
    done();
  });
  it('should return -1 in an empty list', function (done) {
    var arr = [];
    expect(findIndex(arr, function (v) { return v === 1; })).to.equal(-1);
    done();
  });
  it('should get the index of an item in an array/string that passes a given function', function (done) {
    var arr = ctx.arr;
    expect(findIndex(arr, isObject)).to.equal(0);
    expect(findIndex(arr, isArray)).to.equal(2);
    expect(findIndex(arr, isFunction)).to.equal(-1);
    done();
  });
  it('should get the index of an item in an array/string that passes a given function when used with map', function (done) {
    var arr = ctx.arr;
    expect([arr].map(findIndex(isObject))).to.eql([0]);
    expect([arr].map(findIndex(isArray))).to.eql([2]);
    expect([arr].map(findIndex(isFunction))).to.eql([-1]);
    done();
  });
  it('should error when given invalid arguments', function (done) {
    try {
      findIndex({});
    }
    catch (err) {
      expect(err.message).to.equal('first argument must be a list (have length) or function');
    }
    try {
      findIndex();
    }
    catch (err) {
      expect(err.message).to.equal('first argument must be a list (have length) or function');
    }
    try {
      findIndex(ctx.arr, {});
    }
    catch (err) {
      expect(err.message).to.equal('predicate must be a function');
    }
    try {
      findIndex(isArray)({});
    }
    catch (err) {
      expect(err.message).to.equal('list must have length property');
    }
    try {
      findIndex(isArray)();
    }
    catch (err) {
      expect(err.message).to.equal('list must have length property');
    }
    done();
  });
});
