var Lab = require('lab');
var describe = Lab.experiment;
var it = Lab.test;
var expect = Lab.expect;

var pick = require('../pick');

describe('pick', function () {
  it('should pick keys from an object', function(done) {
    var obj = {
      foo: 1,
      bar: 1,
      qux: 1
    };
    expect(pick(obj, 'bar')).to.eql({
      bar: 1
    });
    expect(pick(obj, ['bar'])).to.eql({
      bar: 1
    });
    expect(pick(obj, 'foo', 'bar')).to.eql({
      foo: 1,
      bar: 1
    });
    expect(pick(obj, ['foo', 'bar'])).to.eql({
      foo: 1,
      bar: 1
    });
    expect(pick(obj, ['foo', 'bar'], 'qux')).to.eql({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj, ['foo', 'bar'], ['qux'])).to.eql({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj)).to.eql({});
    expect(pick(obj, [])).to.eql({});
    done();
  });
  it('should pick keys from objects in an array when used with map', function(done) {
    var objs = [
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3,
        koo: 3,
        goo: 3
      }
    ];
    expect(objs.map(pick('bar'))).to.eql([
      {
        bar: 1
      },
      {
        bar: 2
      },
      {
        bar: 3
      }
    ]);
    expect(objs.map(pick(['bar']))).to.eql([
      {
        bar: 1
      },
      {
        bar: 2
      },
      {
        bar: 3
      }
    ]);
    expect(objs.map(pick('foo', 'bar'))).to.eql([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick(['foo', 'bar']))).to.eql([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick(['foo', 'bar'], 'qux'))).to.eql([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick(['foo', 'bar'], ['qux']))).to.eql([
      {
        bar: 1
      },
      {
        foo: 2,
        bar: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick())).to.eql([
      {}, {}, {}
    ]);
    expect(objs.map(pick([]))).to.eql([
      {}, {}, {}
    ]);
    done();
  });
});