/**
 * @module test/includes
 */
'use strict';

var Code = require('code');
var Lab = require('lab');
var sinon = require('sinon');

var lab = exports.lab = Lab.script();

var afterEach = lab.afterEach;
var beforeEach = lab.beforeEach;
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

var includes = require('../includes');

describe('includes', function () {

  describe('stubbed Array.prototype.includes', function () {
    beforeEach(function (done) {
      Array.prototype.includes = sinon.stub().returns(true);
      done();
    });
    afterEach(function (done) {
      delete Array.prototype.includes;
      done();
    });
    it('should defer to ES7 includes if defined', function (done) {
      var result = includes([1, 2, 3], 2);
      expect(result).to.equal(true);
      expect(Array.prototype.includes.callCount).to.equal(1);
      done();
    });
  });

  describe('without fromIndex', function () {
    var someObj = {};
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
      [['a', 'b', 'c'], 'b', true],
      [['a', 'b', 'c'], 'e', false],
      [['a', 'b', someObj, 'c'], someObj, true],
      [['a', 'b', 'c'], someObj, false],
      [[], 2, false],
      [[], '', false],
      [[], 0, false],
      [[NaN, 0, 0], NaN, true],
      [[NaN, 0, 0], 0, true],
      [[-0, 0, 0], 0, true],
      [[-0, 0, 0], -0, true],
      [[0, 0, 0], -0, true],
      [[0, NaN, 0, 0], NaN, true],
      [[0, NaN, 0, 0], 0, true],
      [[0, -0, 0, 0], 0, true],
      [[0, -0, 0, 0], -0, true],
      [[0, 0, 0, 0], -0, true]
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
    var someObj = {};
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
      [['a', 'b', 'c'], 'b', 0, true],
      [['a', 'b', 'c'], 'e', 0, false],
      [['a', 'b', someObj, 'c'], someObj, 0, true],
      [['a', 'b', 'c'], someObj, 0, false],
      [[], 2, 1000, false],
      [[], '', 1000, false],
      [[], 0, 1000, false],
      [[NaN, 0, 0], NaN, 0, true],
      [[-0, 0, 0], 0, 0, true],
      [[NaN, 0, 0], NaN, 0, true],
      [[NaN, 0, 0], 0, 0, true],
      [[-0, 0, 0], 0, 0, true],
      [[-0, 0, 0], -0, 0, true],
      [[0, 0, 0], -0, 0, true],
      [[0, NaN, 0, 0], NaN, 0, true],
      [[0, NaN, 0, 0], 0, 0, true],
      [[0, -0, 0, 0], 0, 0, true],
      [[0, -0, 0, 0], -0, 0, true],
      [[0, 0, 0, 0], -0, 0, true],
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

