var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;
var isString = require('../is-string');

var not = require('../not');

describe('not', function() {
  it('should inverse a function (and work with array functions)', function (done) {
    expect([true, 1, 'hey'].map(not(isString)))
      .to.eql([true, true, false]);
    done();
  });
  it('should inverse a function (and work with array functions)', function (done) {
    expect([true, 1, false].map(not))
      .to.eql([false, false, true]);
    done();
  });
});