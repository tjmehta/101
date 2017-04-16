var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var size = require('../size')

describe('size', function() {
  it('should return [0] for no args', function(done) {
    expect(size()).to.eql([ 
      0 
    ]);
    done();
  });
  
  it('should return [N] for a number with N digits', function(done) {
    expect(size(1234)).to.eql([4]);
    done();
  });
  
  it('should return [N] for an object with N properties', function(done) {
    var obj = { foo: 'bar', fn: function() {}, 0: 100 };
    expect(size(obj)).to.eql([3]);
    done();
  });
  
  it('should return [N] for an object with N properties', function(done) {
    var obj = { foo: 'bar', fn: function() {}, 0: 100 };
    expect(size(obj)).to.eql([3]);
    done();
  });

  it('should return [0] for null', function(done) {
    var obj = { foo: 'bar', fn: function() {}, 0: 100 };
    expect(size(null)).to.eql([0]);
    done();
  });
  
  it('should return [0,0,0] for [null, undefined, Infinity]', function(done) {
    expect(size([null, undefined, Infinity])).to.eql([0, 0, 0]);
    done();
  });
  
  it('should return [3] for [100]', function(done) {
    expect(size([100])).to.eql([3]);
    done();
  });
  
  it('should return [1, 2, 3] for [1, 22, 333]', function(done) {
    expect(size([1, 22, 333])).to.eql([1,2,3]);
    done();
  });
  
  it('should return [1, 2, 3] for [ { foo: "bar" }, "hi", [1,2,3] ]', function(done) {
    expect(size([ { foo: 'bar' }, 'hi', [1, 2, 3] ])).to.eql([ 1, 2, 3 ]);
    done();
  });  

  it('should return [ [1], [2], [1, 1, 1] ] for [ { foo: "bar" }, "hi", [1,2,3] ].map(size)', function(done) {
    expect([{ foo: 'bar' }, 'hi', [1,2,3]].map(size)).to.eql([ [1], [2], [1, 1, 1] ]);
    done();
  });
});
