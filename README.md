![101](http://i.imgur.com/MFrmMt6.png)
===
[![NPM](https://nodei.co/npm/101.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/101/)
[![Build Status](https://travis-ci.org/tjmehta/101.svg?branch=master)](https://travis-ci.org/tjmehta/101)
[![Coverage Status](https://coveralls.io/repos/tjmehta/101/badge.png)](https://coveralls.io/r/tjmehta/101)

# Why another JS util library?
### 1) 101 will be maintained to minimize overlap with vanilla JS.
* 101 utils are made to work well with vanilla JS methods.
* 101 will only duplicate vanilla JS to provide Functional Programming paradigms, or if
the method is not available in a widely supported JS version (currently ES5).
* Other libraries often duplicate a lot of ES5: forEach, map, reduce, filter, sort, and more.

### 2) No need for custom builds.
* With 101, import naturally, and what you use will be bundled.
* Each util method is a module that can be required `require('101/<util>')`.
* Currently node/browserify is supported, I will add other module system support on request.
* Other libraries can be large, and require manually creating custom builds when optimizing for size.

### Why not release each as individual modules?
I usually agree with this philosophy; however, while in practice, adherence to the module-pattern  
can become quite annoying for micro-modules (like those in 101):
* Micro-modules existance throughout a project can change very frequently, because of this one may find
themselves constantly updating their package.json (repeatedly adding and removing the same micro-modules).
* Unbundling micro-modules can lead to projects with hundreds of dependencies which can be tedious to maintain.



# Installation

`npm install 101`

# Usage

## assign (aka extend)

Just like ES6's `Object.assign`. Extend an object with any number of objects (returns original).

```js
var assign = require('101/assign');

var target = { foo: 1 };
var source1 = { bar: 1 };
var source2 = { baz: 1 };
assign(target, source1) // { foo: 1, bar: 1, baz: 1 } target extended with source objects
assign(target, source1, source2) // { foo: 1, bar: 1, baz: 1 } target extended with source objects
```

## and

Functional version of `&&`. Works great with `array.reduce`.

```js
var and = require('101/and');

and(true, false); // false
and(true, true);  // true
and(true, "foo");  // "foo"
```

## apply

Functional version of `function.apply`.
Supports partial functionality (great with array functions).

```js
var apply = require('101/apply');
[sum].map(apply(null, [1, 2, 3])); // [6] = [sum(1,2,3)] = [1+2+3]
function sum () {  /* sums all arguments */ }
apply({ prop: 'val' })(function () { return this.prop; });  // 'val'
```

## clone

It's [clone](https://www.npmjs.org/package/clone) (Only exporting this bc it is used internal to 101)

```js
var clone = require('101/clone');
var obj = {
  foo: 1,
  bar: 2
};

clone(obj); // { foo: 1, bar: 2 }
```

## compose

Functional composition method. Works great with `array.reduce`.

```js
var compose = require('101/compose');

compose(isNaN, parseInt)('nope'); // isNaN(parseInt('nope')) // true
compose(isNaN, parseInt, pluck('id'))({ id: 'nope'}); // isNaN(parseInt(pluck({ id: 'nope' }, 'id')) // true
[isNaN, parseInt, pluck('id')].reduce(compose)({ id: 'nope'}); // isNaN(parseInt(pluck({ id: 'nope' }, 'id')) // true
```

## envIs

Functional version of `str === process.env.NODE_ENV`.
Or's multiple environments.

```js
var envIs = require('101/env-is');
// process.env.NODE_ENV = development
envIs('development');     // true
envIs('production');      // false
envIs('staging', 'production');     // false
envIs('development', 'production'); // true
```

## equals

Functional version of `===`.
Supports partial functionality (great with array functions).

```js
var equals = require('101/equals');

equals(1, 1);            // true
[1,2,3].some(equals(1)); // true
equals(1, '1');          // false
```

## exists

Simple exists function.

```js
var exists = require('101/exists');

exists('foo');     // true
exists(null);      // false
exists(undefined); // false
```

## find

Just like ES6's `array.find`.

Finds the first value in the list that passes the given function (predicate) and returns it.
If list is not provided find will return a partial-function which accepts a list as the first argument.

```js
var find = require('101/find');
var hasProps = require('101/has-properties');
var arr = [{ a: 1, b: 1 }, { b: 1 }, { c: 1 }];

var item = find(arr, hasProps({ a:1 }));
// returns { a: 1, b: 1 }
// returns null if not found
```

## findIndex

Just like ES6's `array.findIndex`.

Finds the first value in the list that passes the given function (predicate) and returns it's index.
If list is not provided findIndex will return a partial-function which accepts a list as the first argument.

```js
var findIndex = require('101/find-index');
var arr = [1, 2, 3];

var index = findIndex(arr, function (val, i, arr) {
  return val === 2;
});
// returns 1
// returns -1 if not found
```

## hasKeypaths

Determines whether the keypaths exist and have the specified values.
Supports partial functionality (great with array functions, and 101/find).

```js
var hasKeypaths = require('101/has-keypaths');
var obj = {
  foo: {
    bar: {
      qux: 1
    }
  }
};

hasKeypaths(obj, ['foo.bar.qux']);      // true
hasKeypaths(obj, { 'foo.bar.qux': 1 }); // true
hasKeypaths(obj, ['foo.qux']);          // false
hasKeypaths(obj, { 'foo.bar': 2 });     // false
hasKeypaths(obj, { 'foo.bar': 1, 'nope': 1 }); // false

// optional 'deep' arg, defaults to true
var barObj = { bar: 1 };
hasKeypaths(obj, { 'foo.bar': barObj });         // true
hasKeypaths(obj, { 'foo.bar': barObj }, true);   // true
hasKeypaths(obj, { 'foo.bar': barObj }, false);  // false
hasKeypaths(obj, { 'foo.bar': obj.foo }, false); // true
hasKeypaths(obj, ['foo.bar'], false);            // true, uses [hasOwnProperty vs in](http://stackoverflow.com/questions/13632999/if-key-in-object-or-ifobject-hasownpropertykey)
// use it with find, findIndex, or filter!
var arr = [obj, { b: 1 }, { c: 1 }];
find(arr, hasProps({ 'foo.bar.qux':1 })); // { foo: { bar: { qux: 1 } } }
find(arr, hasProps(['foo.bar.qux']));     // { foo: { bar: { qux: 1 } } }
```

## hasProperties

Determines whether the keys exist and, if specified, has the values.
Supports partial functionality (great with array functions, and 101/find).
NOTE: I am considering deprecating this method, bc it is so similar to has-keypaths.

```js
var hasProps = require('101/has-properties');
var obj = {
  qux: 1
};
obj['foo.bar'] = 1

hasProps(obj, ['foo', 'qux']); // true
hasProps(obj, { qux: 1 }) // true

// optional 'deep' arg, defaults to true
var barObj = { bar: 1 };
hasProps(obj, { 'foo.bar': barObj });         // true
hasProps(obj, { 'foo.bar': barObj }, true);   // true
hasProps(obj, { 'foo.bar': barObj }, false);  // false
hasProps(obj, ['foo.bar'], false);            // true, uses [hasOwnProperty vs in](http://stackoverflow.com/questions/13632999/if-key-in-object-or-ifobject-hasownpropertykey)
// use it with find, findIndex, or filter!
var arr = [{ a: 1, b: 1 }, { b: 1 }, { c: 1 }];
find(arr, hasProps({ a:1 })); // { a: 1, b: 1 }
find(arr, hasProps(['a']));   // { a: 1, b: 1 }
```

## instanceOf

Functional version of JavaScript's instanceof.
Supports partial functionality (great with array functions).

```js
var instanceOf = require('101/instance-of');

['foo', 'bar', 1].map(instanceOf('string')); // [true, true, false]
```

## isBoolean

Functional version of `typeof val === 'boolean'`.
Supports partial functionality (great with array functions).

```js
var isBoolean = require('101/is-boolean');

[true, false, 1].map(isBoolean); // [true, true, false]
```

## isEmpty

Functional version of val empty object, array or object

```js
var isEmpty = require('101/is-empty');

isEmpty([]); // true
isEmpty({}); // true
isEmpty(""); // true
isEmpty(" "); // false
```

## isFunction

Functional version of `typeof val === 'function'`

```js
var isFunction = require('101/is-function');

[parseInt, function () {}, 'foo'].map(isFunction); // [true, true, false]
```

## isNumber

Functional version of val typeof 'number'

```js
var isNumber = require('101/is-number');

['foo', 'bar', 1].map(isNumber); // [false, false, true]
```

## isObject

Functional *strict* version of val typeof 'object' (and not array or regexp)

```js
var isObject = require('101/is-object');

[{}, { foo: 1 }, 100].map(isObject); // [true, true, false]
```

## isString

Functional version of val typeof 'string'

```js
var isString = require('101/is-string');

['foo', 'bar', 1].map(isString); // [true, true, false]
```

## last

Returns the last value of a list

```js
var last = require('101/last');

last([1, 2, 3]); // 3
last('hello');   // 'o'
```

## noop

No-op function

```js
require('101/noop'); // function () {}
```

## not

Functional version of `!`.

```js
var not = require('101/not');

not(isString)('hey'); // false
not(isString)(100);   // true
```

## omit

Returns a new object without the specified keys.
Supports partial functionality (great with array functions, like map).

```js
var omit = require('101/omit');
var obj = {
  foo: 1,
  bar: 2
};

omit(obj, 'foo');          // { bar: 1 }
omit(obj, ['foo']);        // { bar: 1 }
omit(obj, ['foo', 'bar']); // { }

// use it with array.map
[obj, obj, obj].map(omit('foo')); // [{ bar: 1 }, { bar: 1 }, { bar: 1 }];
```

## or

Functional version of `||`.
Works great with `array.reduce`.

```js
var or = require('101/or');

or(true, true);   // true
or(true, false);  // true
or(false, false); // false
or("foo", false); // "foo"
```

## passAll

Muxes arguments across many functions and `&&`'s the results.
Supports partial functionality (great with array functions, like map).

```js
var passAll = require('101/pass-all');

['', 'foo', 'bar', 100].map(passAll(isString, isTruthy)); // [false, true, true, false]
```

## passAny

Muxes arguments across many functions and `||`'s the results.
Supports partial functionality (great with array functions, like map).

```js
var passAny = require('101/pass-any');

['', 'foo', 'bar', 100].map(passAny(isString, isNumber)); // [true, true, true, true]
```

## pick

Returns a new object with the specified keys (with key values from obj).
Supports partial functionality (great with array functions, like map).

```js
var pick = require('101/pick');
var obj = {
  foo: 1,
  bar: 2
};

pick(obj, 'foo');          // { foo: 1 }
pick(obj, ['foo']);        // { foo: 1 }
pick(obj, ['foo', 'bar']); // { foo: 1, bar: 2 }

// use it with array.map
[obj, obj, obj].map(pick('foo')); // [{ foo: 1 }, { foo: 1 }, { foo: 1 }];
```

## pluck

Functional version of obj[key], returns the value of the key from obj.
Supports partial functionality (great with array functions, like map).

```js
var pluck = require('101/pluck');
var obj = {
  foo: 1,
  bar: 2
};

pluck(obj, 'foo'); // 1

// use it with array.map
[obj, obj, obj].map(pluck('foo')); // [1, 1, 1]

// supports keypaths by default
var obj = {
  foo: {
    bar: 1
  },
  'foo.bar': 2
};

pluck(obj, 'foo.bar'); // 1, supports keypaths by default
pluck(obj, 'foo.bar', false); // 2, pass false to not use keypaths
```

## set

Functional version of obj[key] = val, returns a new obj with the key and value set.
Supports partial functionality (great with array functions, like map).

```js
var set = require('101/set');
var obj = {
  foo: 1,
  bar: 2
};

set(obj, 'foo'); // 1

// use it with array.map
[obj, obj, obj].map(set('foo', 100)); // [{ foo: 100, bar: 2 }, {same}, {same}]

// supports keypaths by default
var obj = {
  foo: 1,
  bar: 2
};

set(obj, 'foo', 100); // { foo: 100, bar:2 }
```

## xor

Exclusive or
Works great with `array.reduce`.

```js
var xor = require('101/xor');

xor(true, true);   // false
xor(true, false);  // true
xor(false, true);  // true
xor(false, false); // false
```

## License

MIT
