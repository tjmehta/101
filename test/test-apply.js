var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var apply = require('../apply');

describe('apply', function () {
  before(function (done) {
    this.args = [1,2,3];
    done();
  });
  after(function (done) {
    delete this.args;
    done();
  });
  it('should apply context and arguments to a function - working array functions', function (done) {
    expect([sum].map(apply(this.args))).to.eql([sum.apply(null, this.args)]);
    done();
  });
  describe('context', function() {
    before(function (done) {
      this.ctx = { foo: 1 };
      done();
    });
    after(function (done) {
      delete this.ctx;
      done();
    });
    it('should apply context and arguments to a function - working array functions', function (done) {
      var self = this;
      apply(this.ctx)(checkContext);
      done();
      function checkContext () {
        return expect(this).to.equal(self.ctx);
      }
    });
  });
});

function sum (/* args */) {
  args.reduce(function (memo, item) {
    return memo + item;
  });
}

