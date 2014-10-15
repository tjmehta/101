var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Lab.expect;

var apply = require('../apply');

describe('apply', function () {
  var ctx = {};
  before(function (done) {
    ctx.args = [1,2,3];
    done();
  });
  after(function (done) {
    delete ctx.args;
    done();
  });
  it('should apply context and arguments to a function - working array functions', function (done) {
    expect([sum].map(apply(null, ctx.args))).to.eql([sum.apply(null, ctx.args)]);
    done();
  });
  describe('context', function() {
    before(function (done) {
      ctx.ctx = { foo: 1 };
      done();
    });
    after(function (done) {
      delete ctx.ctx;
      done();
    });
    it('should apply context and arguments to a function - working array functions', function (done) {
      var context = {};
      apply(context)(checkContext);
      done();
      function checkContext () {
        return expect(this).to.equal(context);
      }
    });
  });
});

function sum (/* args */) {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function (memo, item) {
    return memo + item;
  }, 0);
}

