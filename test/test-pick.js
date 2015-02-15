var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
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
    expect(pick(obj, RegExp('a'))).to.eql({
      bar: 1
    });
    expect(pick(obj, RegExp('a'), 'foo')).to.eql({
      foo: 1,
      bar: 1
    });
    expect(pick(obj, [RegExp('q|b')], 'bar')).to.eql({
      bar: 1,
      qux: 1
    });
    expect(pick(obj, [RegExp('q'), RegExp('f')], ['bar'])).to.eql({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj, [RegExp('q'), 'foo'], 'bar')).to.eql({
      foo: 1,
      bar: 1,
      qux: 1
    });
    expect(pick(obj, [RegExp('x$'), 'foo'], [RegExp('b')])).to.eql({
      foo: 1,
      bar: 1,
      qux: 1
    });
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
    expect(objs.map(pick(RegExp('q|g')))).to.eql([
      {},
      {
        qux: 2
      },
      {
        goo: 3
      }
    ]);
    expect(objs.map(pick(RegExp('BAR', 'i'), 'foo'))).to.eql([
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
    expect(objs.map(pick([RegExp('b')], 'foo'))).to.eql([
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
    expect(objs.map(pick([RegExp('b'), 'qux'], ['foo']))).to.eql([
      {
        bar: 1
      },
      {
        bar: 2,
        foo: 2,
        qux: 2
      },
      {
        foo: 3,
        bar: 3
      }
    ]);
    expect(objs.map(pick([RegExp('b'), RegExp('^f')], [RegExp('oo$')]))).to.eql([
      {
        bar: 1
      },
      {
        bar: 2,
        foo: 2
      },
      {
        bar: 3,
        foo: 3,
        koo: 3,
        goo: 3
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