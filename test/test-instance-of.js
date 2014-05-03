var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var instanceOf = require('../instance-of');

describe('instanceOf', function () {
  it('should return true for instances of a class when used with map', function(done) {
    var regexps = [/one/, /two/];
    expect(regexps.map(instanceOf(RegExp)))
      .to.eql([true, true]);
    done();
  });
  it('should return false for non-instance of a class when used with map', function(done) {
    var nonRegExps = ['string', function () {}, [], true, {}, null, undefined];
    expect(nonRegExps.map(instanceOf(RegExp)))
      .to.eql([false, false, false, false, false, false, false]);
    done();
  });
});