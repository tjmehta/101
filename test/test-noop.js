var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
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