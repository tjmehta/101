var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var isString = require('../is-string');

var passAll = require('../pass-all');

describe('passAll', function () {
  before(function (done) {
    this.arr = [true, 'foo', 'bar', 'qux', ''];
    this.ctx = { foo: 1 };
    done();
  });
  after(function (done) {
    delete this.arr;
    delete this.ctx;
    done();
  });
  it('should work with array functions', function(done) {
    expect(this.arr.filter(passAll(isString, Boolean)))
      .eql(this.arr.filter(isStringAndTruthy));
    done();
  });
  it('should apply its context to the functions', function(done) {
    var self = this;
    this.arr.forEach(passAll(checkContext).bind(this.ctx));
    done();
    function checkContext () {
      return expect(this).to.equal(self.ctx);
    }
  });
  it('should throw an error if it receives non-function args', function(done) {
    try {
      this.arr.forEach(passAll(true, false));
    }
    catch (err) {
      expect(err.message).to.equal('all funcs should be functions');
    }
    done();
  });
});

function isStringAndTruthy (item) {
  return isString(item) && Boolean(item);
}