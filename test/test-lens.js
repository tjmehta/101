var Lab = require('lab');
var lens = require('../lens');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var Code = require('code');
var expect = Code.expect;

describe('lens', function() {
  var toUpper = function(str) { return str.toUpperCase(); };
  var obj, arr;

  beforeEach(function(done) {
    obj = {
      foo: 'foo',
      bar: 'bar'
    };

    arr = ['foo', 'bar'];

    done();
  });

  it('should create a lense', function(done) {
    var l = lens('foo');

    expect(typeof l).to.equal('function');
    expect(typeof l.set).to.equal('function');
    expect(typeof l.mod).to.equal('function');
    done();
  });

  it('should create a lense for a given key', function(done) {
    var l = lens('foo');

    expect(l(obj)).to.equal('foo');
    expect(l.set('moo', obj).foo).to.equal('moo');
    expect(l.mod(toUpper, obj).foo).to.equal('FOO');
    done();
  });

  it('should create a lense with a given getter and setter', function(done) {
    var first = lens(
        function(arr) { return arr[0]; },
        function(val, arr) { var clone = arr.slice(); clone[0] = val; return clone; }
    );

    expect(first(arr)).to.equal('foo');
    expect(first.set('moo', arr)[0]).to.equal('moo');
    expect(first.mod(toUpper, arr)[0]).to.equal('FOO');
    done();
  });

  it('should create a curryied set and mod', function(done) {
    var l = lens('foo');

    expect(l(obj)).to.equal('foo');
    expect(l.set('moo')(obj).foo).to.equal('moo');
    expect(l.mod(toUpper)(obj).foo).to.equal('FOO');

    var first = lens(
        function(arr) { return arr[0]; },
        function(val, arr) { var clone = arr.slice(); clone[0] = val; return clone; }
    );

    expect(first(arr)).to.equal('foo');
    expect(first.set('moo')(arr)[0]).to.equal('moo');
    expect(first.mod(toUpper)(arr)[0]).to.equal('FOO');
    done();
  });
});
