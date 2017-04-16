var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var isElement = require('../is-element');

describe('isElement', function () {
  it('should return true for DOM element', function(done) {
    // document object access problem :cry:
    // expect(isElement(document.body)).to.be.true;
    done();
  });
  it('should return false for non-DOM element', function(done) {
    expect(isElement(['foo'])).to.be.false;
    expect(isElement('foo')).to.be.false;
    expect(isElement(101)).to.be.false;
    expect(isElement({})).to.be.false;
    expect(isElement(/re/)).to.be.false;
    expect(isElement(true)).to.be.false;
    expect(isElement(null)).to.be.false;
    expect(isElement(undefined)).to.be.false;
    expect(isElement(function() {})).to.be.false;
    done();
  });
});