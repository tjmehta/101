var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var beforeEach = Lab.beforeEach;
var afterEach = Lab.afterEach;
var expect = Lab.expect;

var noop = require('../noop');

describe('noop', function () {
  it('should do nothing', function (done) {
    var doNothing = function () {};
    expect(noop.toString()).to.equal(doNothing.toString());
    expect(noop()).to.equal(undefined);
    done();
  });
});