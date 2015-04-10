var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var isString = require('../is-string');
var not = require('../not');

describe('not', function() {
  it('should inverse a function (and work with array functions)', function (done) {
    expect([true, 1, 'hey'].map(not(isString)))
      .to.deep.equal([true, true, false]);
    done();
  });
  it('should inverse a function (and work with array functions)', function (done) {
    expect([true, 1, false].map(not))
      .to.deep.equal([false, false, true]);
    done();
  });
});
