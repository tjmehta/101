var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var equals = require('../equals');

describe('equals', function() {
  it('should work like Object.is', function (done) {
    var obj = {};
    var compares = [
      ['hey', 'hey'],
      [2, 2],
      [obj, obj],
      ['hey', 'hey'],
      [2, '3'],
      [obj, {}],
      [false, ''],
      [+0, -0],
      [Number.NaN, NaN],
      [0, 0]
    ];
    compares.forEach(function (items) {
      expect(equals(items[0], items[1])).to.equal(Object.is(items[0], items[1]));
    });
    // Monkey patching Object.is, better way?
    var temp = Object.is;
    Object.is = false;
    compares.forEach(function (items) {
      expect(equals(items[0], items[1])).to.equal(temp(items[0], items[1]));
    });
    Object.is = temp;
    done();
  });
  it('should works with array functions', function (done) {
    expect([1,2,3].map(equals(1))).to.be.eql([true, false, false]);
    done();
  });
});
