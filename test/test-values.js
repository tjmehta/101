var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var values = require('../values');

describe('values', function () {
  it('should return all of the values for all '+
     'of the properties in a given object as '+
     'an Array', function (done) {
    expect(values({foo:'1', bar:'a'})).to.deep.equal(['1', 'a']);
    done();
  });

  it('should handle object with no keys', function (done) {
    expect(values({})).to.deep.equal([]);
    done();
  });
});
