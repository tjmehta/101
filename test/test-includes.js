/**
 * @module test/includes
 */
'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var Code = require('code');
var expect = Code.expect;

var includes = require('../includes');

describe('includes', function () {
  describe('without fromIndex', function () {
    var tests = [
      // array, searchItem, expectedResult
      [[1, 2, 3], 'a', false],
      [[1, 2, 3], '', false],
      [[1, 2, 3], 1, true],
      [[1, 2, 3], 2, true],
      [[1, 2, 3], 3, true],
      [[1, 2, 3], 4, false],
      [[1, 2, 3], 0, false],
      [[1, 2, 3], -2, false],
      [[], 2, false],
      [[], '', false],
      [[], 0, false],
      [[NaN, 0, 0], NaN , true],
      [[-0, 0, 0], 0, true],
    ];

    describe('compose', function () {
      it('should return a function with a bound argument', function (done) {
        tests.forEach(function (test) {
          var includesFn = includes(test[0]);
          expect(includesFn).to.be.a.function();
          expect(includesFn(test[1])).to.equal(test[2]);
        });
        done();
      });
    });

    describe('no compose', function () {
      it('should return correct bool value if element is present in array or not', function (done) {
        tests.forEach(function (test) {
          var res = includes(test[0], test[1]);
          expect(res).to.equal(test[2]);
        });
        done();
      });
    });
  });

  describe('with fromIndex', function () {
    var tests = [
      // array, searchItem, fromIndex, expectedResult
      [[1, 2, 3], 'a', 1, false],
      [[1, 2, 3], '', 1, false],
      [[1, 2, 3], 1, 1, false], // 1 at index 0, fromIndex 1 -- false
      [[1, 2, 3], 2, 0, true],
      [[1, 2, 3], 3, 2, true],
      [[1, 2, 3], 4, 0, false],
      [[1, 2, 3], 0, 0, false],
      [[1, 2, 3], -2, 0, false],
      [[], 2, 1000, false],
      [[], '', 1000, false],
      [[], 0, 1000, false],
      [[NaN, 0, 0], NaN, 0, true],
      [[-0, 0, 0], 0, 0, true],
      [[1, 2, 3, 4, 5], 4, 10, false],
      [[1, 2, 3, 4, 5], 4, -10, true], // fromIndex < 0, cast to 0
      [[1, 2, 3, 4, 5], 4, -3, true],
      [[1, 2, 3, 4, 5], 4, -1, false], //-1 fromIndex, start search from array.length - 1
    ];
    describe('compose', function () {
      it('should return a function with a bound argument', function (done) {
        tests.forEach(function (test) {
          var includesFn = includes(test[0]);
          expect(includesFn).to.be.a.function();
          expect(includesFn(test[1], test[2])).to.equal(test[3]);
        });
        done();
      });
    });

    describe('no compose', function () {
      it('should return correct bool value if element is present in array or not', function (done) {
        tests.forEach(function (test) {
          var res = includes(test[0], test[1], test[2]);
          expect(res).to.equal(test[3]);
        });
        done();
      });
    });
  });
});

