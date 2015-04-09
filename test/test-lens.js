var Lab = require('lab');
var lens = require('../lens');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var expect = Lab.expect;

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

    expect(typeof l).to.eql('function');
    expect(typeof l.set).to.eql('function');
    expect(typeof l.mod).to.eql('function');
    done();
  });

  it('should create a lense for a given key', function(done) {
    var l = lens('foo');

    expect(l(obj)).to.eql('foo');
    expect(l.set('moo', obj).foo).to.eql('moo');
    expect(l.mod(toUpper, obj).foo).to.eql('FOO');
    done();
  });

  it('should create a lense with a given getter and setter', function(done) {
    var first = lens(
        function(arr) { return arr[0]; },
        function(val, arr) { var clone = arr.slice(); clone[0] = val; return clone; }
    );

    expect(first(arr)).to.eql('foo');
    expect(first.set('moo', arr)[0]).to.eql('moo');
    expect(first.mod(toUpper, arr)[0]).to.eql('FOO');
    done();
  });

  it('should create a curryied set and mod', function(done) {
    var l = lens('foo');

    expect(l(obj)).to.eql('foo');
    expect(l.set('moo')(obj).foo).to.eql('moo');
    expect(l.mod(toUpper)(obj).foo).to.eql('FOO');

    var first = lens(
        function(arr) { return arr[0]; },
        function(val, arr) { var clone = arr.slice(); clone[0] = val; return clone; }
    );

    expect(first(arr)).to.eql('foo');
    expect(first.set('moo')(arr)[0]).to.eql('moo');
    expect(first.mod(toUpper)(arr)[0]).to.eql('FOO');
    done();
  });
});
