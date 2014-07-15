var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var isString = require('../is-string');
var isFunction = require('../is-function');

var passAny = require('../pass-any');

describe('passAny', function () {
  var ctx = {};
  before(function (done) {
    ctx.arr = [true, 'foo', 'bar', 'qux'];
    ctx.ctx = { foo: 1 };
    done();
  });
  after(function (done) {
    delete ctx.arr;
    delete ctx.ctx;
    done();
  });
  it('should work with array functions', function(done) {
    expect(ctx.arr.filter(passAny(isString, isFunction)))
      .eql(ctx.arr.filter(isStringOrFunction));
    done();
  });
  it('should apply its context to the functions', function(done) {
    ctx.arr.forEach(passAny(checkContext).bind(ctx.ctx));
    done();
    function checkContext () {
      return expect(this).to.equal(ctx.ctx);
    }
  });
  it('should throw an error if it receives non-function args', function(done) {
    try {
      ctx.arr.forEach(passAny(true, false));
    }
    catch (err) {
      expect(err.message).to.equal('all funcs should be functions');
    }
    done();
  });
});

function isStringOrFunction (item) {
  return isString(item) || isFunction(item);
}