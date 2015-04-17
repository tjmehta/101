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
      this.run(this.fn);
    };
    Test.prototype = {
      run: function(fn) { return fn(); },
      fn: function() { res = this instanceof Test; }
    };
  });
});
