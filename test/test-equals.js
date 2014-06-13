var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var equals = require('../equals');

describe('equals', function() {
  it('should work like ===', function (done) {
    var obj = {};
    var compares = [
      ['hey', 'hey'],
      [2, 2],
      [obj, obj],
      ['hey', 'hey'],
      [2, '3'],
      [obj, {}],
      [false, '']
    ];
    compares.forEach(function (items) {
      expect(equals(items[0], items[1])).to.equal(items[0] === items[1]);
    });
    done();
  });
  it('should works with array functions', function (done) {
    expect([1,2,3].map(equals(1))).to.be.eql([true, false, false]);
    done();
  });
});