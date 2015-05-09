var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var indexBy = require('../index-by');
var pluck = require('../pluck');
var pick = require('../pick');

describe('indexBy', function() {
  it('should return empty object when no arguments are given', function(done) {
    expect(indexBy).to.throw(/must be a (string|function)/);
    done();
  });
  it('should work with an array and a string argument', function (done) {
    var arr = [
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux' },
      { foo: 'flux' },
      { foo: 100 }
    ];
    expect(indexBy([], 'foo')).to.deep.equal({});
    expect(indexBy([{foo: 'bar'}], 'foo')).to.deep.equal({
      'bar': {foo: 'bar'}
    });
    expect(indexBy(arr, 'foo')).to.deep.equal({
      'bar': {foo: 'bar', bar: 'yo'},
      'qux': {foo: 'qux'},
      'flux': {foo: 'flux'},
      '100': {foo: 100}
    });
    done();
  });
  it('should work with an array and a function argument', function (done) {
    var arr = [
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux' },
      { foo: 'flux' },
      { foo: 100 }
    ];
    expect(indexBy([], pluck('foo'))).to.deep.equal({});
    expect(indexBy([{foo: 'bar'}], pluck('foo'))).to.deep.equal({
      'bar': {foo: 'bar'}
    });
    expect(indexBy(arr, pluck('foo'))).to.deep.equal({
      'bar': {foo: 'bar', bar: 'yo'},
      'qux': {foo: 'qux'},
      'flux': {foo: 'flux'},
      '100': {foo: 100}
    });
    done();
  });
  it('should work with reduce, with a string argument', function (done) {
    var arr = [
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux' },
      { foo: 'flux' },
      { foo: 100 }
    ];
    expect([].reduce(indexBy('foo'), {})).to.deep.equal({});
    expect([{foo:'bar'}].reduce(indexBy('foo'), {})).to.deep.equal({
      'bar': {foo: 'bar'}
    });
    expect(arr.reduce(indexBy('foo'), {})).to.deep.equal({
      'bar': {foo: 'bar', bar: 'yo'},
      'qux': {foo: 'qux'},
      'flux': {foo: 'flux'},
      '100': {foo: 100}
    });
    done();
  });
  it('should work with reduce, with a function argument', function(done) {
    var arr = [
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux' },
      { foo: 'flux' },
      { foo: 100 }
    ];
    expect([].reduce(indexBy(pluck('foo')), {})).to.deep.equal({});
    expect(arr.reduce(indexBy(pluck('foo')), {})).to.deep.equal({
      'bar': { foo: 'bar', bar: 'yo' },
      'qux': { foo: 'qux' },
      'flux': { foo: 'flux' },
      '100': { foo: 100 }
    });
    done();
  });
  it('should work with not-pluck functions', function(done) {
    expect([
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux' },
      { foo: 'flux' },
      { foo: 100 }
    ].reduce(indexBy(function(obj){
      return obj['foo'].toString() + 1;
    }), {})).to.deep.equal({
      'bar1': { foo: 'bar', bar: 'yo' },
      'qux1': { foo: 'qux' },
      'flux1': { foo: 'flux' },
      '1001': { foo: 100 }
    });
    expect([
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux', qux: 'bar' },
      { foo: 'flux', goo:'foo' },
      { foo: 100, 200: 'foo'}
    ].reduce(indexBy(function(obj){
      var newKey = '';
      var keys = Object.keys(obj).sort().forEach(function(el){
        newKey += el;
      });
      return newKey.toString();
    }), {})).to.deep.equal({
      'barfoo': { foo: 'bar', bar: 'yo' },
      'fooqux': { foo: 'qux', qux: 'bar' },
      'foogoo': { foo: 'flux', goo:'foo' },
      '200foo': { foo: 100, 200: 'foo'}
    });
    done();
  });
});