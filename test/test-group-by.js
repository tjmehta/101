var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var groupBy = require('../group-by');
var pluck = require('../pluck');
var pick = require('../pick');

describe('groupBy', function() {
  it('should return empty object when no arguments are given', function(done) {
    expect(groupBy).to.throw(/must be a (string|function)/);
    done();
  });
  it('should work with an array and a string argument', function (done) {
    var arr = [
      { foo: 'bar', bar: 'yo' },
      { foo: 'bar', bar: 'yo2'},
      { foo: 'qux' },
      { foo: 'flux' },
      { foo: 100 }
    ];
    expect(groupBy([], 'foo')).to.deep.equal({});
    expect(groupBy([{foo: 'bar'}], 'foo')).to.deep.equal({
      'bar': [{foo: 'bar'}]
    });
    expect(groupBy(arr, 'foo')).to.deep.equal({
      'bar': [{foo: 'bar', bar: 'yo'}, { foo: 'bar', bar: 'yo2'}],
      'qux': [{foo: 'qux'}],
      'flux': [{foo: 'flux'}],
      '100': [{foo: 100}]
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
    expect(groupBy([], pluck('foo'))).to.deep.equal({});
    expect(groupBy([{foo: 'bar'}], pluck('foo'))).to.deep.equal({
      'bar': [{foo: 'bar'}]
    });
    expect(groupBy(arr, pluck('foo'))).to.deep.equal({
      'bar': [{foo: 'bar', bar: 'yo'}],
      'qux': [{foo: 'qux'}],
      'flux': [{foo: 'flux'}],
      '100': [{foo: 100}]
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
    expect([].reduce(groupBy('foo'), {})).to.deep.equal({});
    expect([{foo:'bar'}].reduce(groupBy('foo'), {})).to.deep.equal({
      'bar': [{foo: 'bar'}]
    });
    expect(arr.reduce(groupBy('foo'), {})).to.deep.equal({
      'bar': [{foo: 'bar', bar: 'yo'}],
      'qux': [{foo: 'qux'}],
      'flux': [{foo: 'flux'}],
      '100': [{foo: 100}]
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
    expect([].reduce(groupBy(pluck('foo')), {})).to.deep.equal({});
    expect(arr.reduce(groupBy(pluck('foo')), {})).to.deep.equal({
      'bar': [{ foo: 'bar', bar: 'yo' }],
      'qux': [{ foo: 'qux' }],
      'flux': [{ foo: 'flux' }],
      '100': [{ foo: 100 }]
    });
    done();
  });
  it('should work with not-pluck functions', function(done) {
    expect([
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux' },
      { foo: 'flux' },
      { foo: 100 }
    ].reduce(groupBy(function(obj){
      return obj['foo'].toString() + 1;
    }), {})).to.deep.equal({
      'bar1': [{ foo: 'bar', bar: 'yo' }],
      'qux1': [{ foo: 'qux' }],
      'flux1': [{ foo: 'flux' }],
      '1001': [{ foo: 100 }]
    });
    expect([
      { foo: 'bar', bar: 'yo' },
      { foo: 'qux', qux: 'bar' },
      { foo: 'flux', goo:'foo' },
      { foo: 100, 200: 'foo'}
    ].reduce(groupBy(function(obj){
      var newKey = '';
      var keys = Object.keys(obj).sort().forEach(function(el){
        newKey += el;
      });
      return newKey.toString();
    }), {})).to.deep.equal({
      'barfoo': [{ foo: 'bar', bar: 'yo' }],
      'fooqux': [{ foo: 'qux', qux: 'bar' }],
      'foogoo': [{ foo: 'flux', goo:'foo' }],
      '200foo': [{ foo: 100, 200: 'foo'}]
    });
    done();
  });
});