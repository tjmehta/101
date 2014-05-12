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
  before(function (done) {
    this.arr = [true, 'foo', 'bar', 'qux'];
    this.ctx = { foo: 1 };
    done();
  });
  after(function (done) {
    delete this.arr;
    delete this.ctx;
    done();
  });
  it('should work with array functions', function(done) {
    expect(this.arr.filter(passAny(isString, isFunction)))
      .eql(this.arr.filter(isStringOrFunction));
    done();
  });
  it('should apply its context to the functions', function(done) {
    var self = this;
    this.arr.forEach(passAny(checkContext).bind(this.ctx));
    done();
    function checkContext () {
      return expect(this).to.equal(self.ctx);
    }
  });
  it('should throw an error if it receives non-function args', function(done) {
    try {
      this.arr.forEach(passAny(true, false));
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