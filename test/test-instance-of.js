var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var instanceOf = require('../instance-of');

describe('instanceOf', function () {
  it('should return true for instances of a class when used with map', function(done) {
    var regexps = [/one/, /two/];
    expect(regexps.map(instanceOf(RegExp)))
      .to.deep.equal([true, true]);
    done();
  });
  it('should return false for non-instance of a class when used with map', function(done) {
    var nonRegExps = ['string', function () {}, [], true, {}, null, undefined];
    expect(nonRegExps.map(instanceOf(RegExp)))
      .to.deep.equal([false, false, false, false, false, false, false]);
    done();
  });
});
