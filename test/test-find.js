var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var Code = require('code');
var expect = Code.expect;

var isArray = Array.isArray;
var isObject = require('../is-object');
var isFunction = require('../is-function');

var find = require('../find');

describe('find', function () {
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
    expect(find(arr, function (v) { return v === 1; })).to.equal(null);
    done();
  });
  it('should get the index of an item in an array/string that passes a given function', function (done) {
    var arr = ctx.arr;
    expect(find(arr, isObject)).to.equal(arr[0]);
    expect(find(arr, isArray)).to.equal(arr[2]);
    expect(find(arr, isFunction)).to.equal(null);
    done();
  });
  it('should get the index of an item in an array/string that passes a given function when used with map', function (done) {
    var arr = ctx.arr;
    expect([arr].map(find(isObject))).to.deep.equal([arr[0]]);
    expect([arr].map(find(isArray))).to.deep.equal([arr[2]]);
    expect([arr].map(find(isFunction))).to.deep.equal([null]);
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
      find(ctx.arr, {});
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
