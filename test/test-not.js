var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var isString = require('../is-string');

var not = require('../not');

describe('not', function() {
  it('should inverse a function (and work with array functions)', function (done) {
    expect([true, 1, 'hey'].map(not(isString)))
      .to.eql([true, true, false]);
    done();
  });
});