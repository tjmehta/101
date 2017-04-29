var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var clone = require('../clone');
// var put = require('../put');
// var set = require('../set');

var merge = require('../merge');

describe('merge', function () {
  it('should merge the value with the current value on a new object', function(done) {
    var obj = {
      comments: [{
        replies: [{
          text: 'Hey, swag'
        }]
      }]
    };

    var original = clone(obj);
    var expected = clone(obj);
    expected.comments[0].replies[0].text = 'Hi, swag';

    const merged = merge(obj, 'comments.0.replies.0', { text: 'Hi, swag' });
    expect(merged).to.deep.equal(expected);
    expect(merged).not.to.equal(obj);
    done();
  });

  it('should merge a value when used with array functions', function(done) {
    var obj = [
      { id: 2, online: false },
      { id: 3, online: false }
    ];

    var expected = clone(obj);
    expected[0].online = true;
    expected[1].online = true;

    var merged = obj.map(merge({ online: true }));
    expect(merged).to.deep.equal(expected);
    expect(merged).not.to.deep.equal(obj);
    done();
  });

  it('should merge a key-value set on when used with array functions', function(done) {
    var obj = [
      { id: 2, user: { online: false } },
      { id: 3, user: { online: false } }
    ];

    var expected = clone(obj);
    expected[0].user.online = true;
    expected[1].user.online = true;

    var merged = obj.map(merge('user', { online: true }));
    expect(merged).to.deep.equal(expected);
    expect(merged).not.to.deep.equal(obj);
    done();
  });
});
