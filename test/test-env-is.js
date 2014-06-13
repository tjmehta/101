var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;

var envIs = require('../env-is');

describe('envIs', function() {
  it('should return true when the argument matches the environment', function (done) {
    process.env.NODE_ENV='test';
    expect(envIs('test')).to.be.ok;
    done();
  });
  it('should return false when the argument doesnt match the environment', function (done) {
    process.env.NODE_ENV='test';
    expect(envIs('development')).to.not.be.ok;
    done();
  });
  it('should "or" if passed multiple environments', function (done) {
    process.env.NODE_ENV='test';
    expect(envIs('development', 'test')).to.be.ok;
    done();
  });
});