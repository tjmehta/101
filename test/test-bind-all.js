var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var bindAll = require('../bind-all');

describe('bind-all', function() {
  it('should bind all the methods', function(done) {
    var res;
    var Test = function() {
      bindAll(this);
      this.run(this.fn);
    };
    Test.prototype = {
      run: function(fn) { return fn(); },
      fn: function() { res = this instanceof Test; }
    };
    new Test();

    expect(res).to.be.true();
    done();
  });

  it('should bind only the specified method', function(done) {
    var binded;
    var unbinded;
    var Test = function() {
      bindAll(this, ['fn']);
      this.run(this.fn, this.not);
    };
    Test.prototype = {
      run: function(one, two) { one(); two(); },
      fn: function() { binded = this instanceof Test; },
      not: function() { unbinded = this instanceof Test; }
    };
    new Test();

    expect(binded).to.be.true();
    expect(unbinded).to.be.false();
    done();
  });

  it('should also work with a string', function(done) {
    var binded;
    var unbinded;
    var Test = function() {
      bindAll(this, 'fn');
      this.run(this.fn, this.not);
    };
    Test.prototype = {
      run: function(one, two) { one(); two(); },
      fn: function() { binded = this instanceof Test; },
      not: function() { unbinded = this instanceof Test; }
    };
    new Test();

    expect(binded).to.be.true();
    expect(unbinded).to.be.false();
    done();
  });

  it('should bind an array with multiple keys', function(done) {
    var binded;
    var also;
    var Test = function() {
      bindAll(this, ['fn', 'also']);
      this.run(this.fn, this.also);
    };
    Test.prototype = {
      run: function(one, two) { one(); two(); },
      fn: function() { binded = this instanceof Test; },
      also: function() { also = this instanceof Test; }
    };
    new Test();

    expect(binded).to.be.true();
    expect(also).to.be.true();
    done();
  });

  it('should also work with a string containing mutiple keys', function(done) {
    var binded;
    var also;
    var Test = function() {
      bindAll(this, 'fn also');
      this.run(this.fn, this.also);
    };
    Test.prototype = {
      run: function(one, two) { one(); two(); },
      fn: function() { binded = this instanceof Test; },
      also: function() { also = this instanceof Test; }
    };
    new Test();

    expect(binded).to.be.true();
    expect(also).to.be.true();
    done();
  });

  it('should trow an error when a wrong format is passed', function(done) {
    var object = {};
    expect(bindAll.bind(this, object, {key: 1})).to.throw(TypeError);
    done();
  });

  it('should return the original object', function(done) {
    var object = {
      hello: function() {}
    };

    expect(bindAll(object)).to.deep.equal(object);
    done();
  });

  it('should return the original empty object', function(done) {
    var object = {};
    var res = bindAll(object);

    expect(res).to.deep.equal(object);
    done();
  });

  it('should not try to bind non-functions keys', function(done) {
    var object = {
      bool: true,
      str: 'hello',
      call: function() {},
    };

    expect(bindAll(object)).to.deep.equal(object);
    done();
  });

  it('should not fail when we specify a non-existing key', function(done) {
    var object = {
      call: function() {}
    };

    expect(bindAll(object, 'call world')).to.deep.equal(object);
    done();
  });
});
