var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var size = require('../size')

describe('size', function() {
  it('should return 0 for empty array', function(done) {
    expect(size([]).to.equal(0);
    done();
  });
  it('should return 0 for empty map', function(done) {
    expect(size({}).to.equal(0);
    done();
  });
  it('should return 0 for empty string', function(done) {
    expect(size("").to.equal(0);
    done();
  });

  
  it('should return 3 for [1, 2, 100]', function(done) {
    expect(size([1, 2, 100]).to.equal(3);
    done();
  });
  it('should return 3 for { a: 1, b: 2, c: 100 }', function(done) {
    expect(size({ a: 1, b: 2, c: 100}).to.equal(3);
    done();
  });
  it('should return 11 for "hello world"', function(done) {
    expect(size("hello world").to.equal(11);
    done();
  });
});
