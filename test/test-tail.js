var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var tail = require('../tail');

describe('tail', function () {
  it('should return the tail from an array, string, or object', function(done) {
    expect(tail([1, 2, 3])).to.deep.equal([2, 3]);
    expect(tail('123')).to.equal('23');
    expect(tail(function (a) {})).to.equal('unction (a) {}');
    expect(tail(null)).to.equal(undefined);
    done();
  });
});
