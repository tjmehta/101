var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var keysIn = require('../keys-in');

describe('keys-in', function() {
  it('should return all the keys of an object', function(done) {
    var object = {
      hello: true,
      world: true
    };

    var keys = keysIn(object);

    expect(keys).to.have.length(2);
    expect(keys).to.deep.equal(['hello', 'world']);
    done();
  });

  it('should return also the prototype keys', function(done) {
    var Test = function() {};
    Test.prototype.hello = function() { return 'hello'; };
    Test.prototype.world = function() { return 'world'; };

    var keys = keysIn(Test);

    expect(keys).to.have.length(2);
    expect(keys).to.deep.equal(['hello', 'world']);
    done();
  });

  it('should return an empty array', function(done) {
    var keys = keysIn();

    expect(Array.isArray(keys)).to.be.true();
    expect(keys.length).to.equal(0);
    done();
  });
});
