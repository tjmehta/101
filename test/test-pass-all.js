var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var before = lab.before;
var after = lab.after;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

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
      .to.deep.equal(this.arr.filter(isStringAndTruthy));
    done();
  });
  it('should apply its context to the functions', function(done) {
    var self = this;
    this.arr.forEach(passAll(checkContext).bind(this.ctx));
    done();
    function checkContext () {
      return expect(this).to.deep.equal(self.ctx);
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
