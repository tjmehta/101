var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var expect = Lab.expect;

var assign = require('../assign');

// very simple test primarily checking exportation, see npm `assign` module...
describe('assign', function () {
  it('should assign an object', function (done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    var obj2 = {
      you: 1
    };
    var assigned = assign(obj, obj2);
    expect(assigned).to.equal(obj);
    expect(assigned).to.eql({
      foo: 1,
      bar: 1,
      qux: 1,
      you: 1
    });
    done();
  });
  it('should support partial functionality', function (done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    var obj2 = {
      you: 1
    };
    var assignPartial = assign(obj2);
    var assigned = assignPartial(obj); // works great with map
    expect(assigned).to.equal(obj);
    expect(assigned).to.eql({
      foo: 1,
      bar: 1,
      qux: 1,
      you: 1
    });
    done();
  });
  it('should throw an error if source is undefined', function (done) {
    try {
      assign(undefined, {});
    }
    catch (e) {
      expect(e.message).to.equal('Cannot convert first argument to object');
      done();
    }
  });
  it('should throw an error if source is null', function (done) {
    try {
      assign(null, {});
    }
    catch (e) {
      expect(e.message).to.equal('Cannot convert first argument to object');
      done();
    }
  });
  it('should just return the target if sources are undefined or null', function(done) {
    var obj = {};
    expect(assign(obj, null)).to.equal(obj);
    expect(assign(obj, undefined)).to.equal(obj);
    done();
  });
});
