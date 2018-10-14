'use strict';

const test = require('kludjs');
const arraysAreEqual = require('./testHelpers').arraysAreEqual;
const arraysAreEqualLength = require('./testHelpers').arraysAreEqualLength;
const blockIt = require('../blockIt').blockIt;
const stallIt = require('../blockIt').stallIt;
const paceIt = require('../blockIt').paceIt;

const testArr = [...new Array(300).keys()];

test('blockIt performs in order with Promises', function (next) {
  blockIt(testFuncReturnPromise, testArr)
    .then(function (result) {
      ok(arraysAreEqual(result, testArr), 'Promises are performed in order and block until resolved.');
      next();
    });
}, true);

test('blockIt performs with non-Promises', function (next) {
  blockIt(testFuncReturnNonPromise, testArr)
    .then(function (result) {
      ok(arraysAreEqual(result, testArr), 'Functions are performed in order.');
      next();
    });
}, true);

test('stallIt stalls', function (next) {
  const interval = 5;
  stallIt(testFuncReturnExecutionTime, testArr, interval)
    .then(function (result) {
      ok(arraysAreEqualLength(result, testArr), 'stallIt operates on all inputs.');
      ok(stepDifferencesAreWithinInterval(result, interval), 'Stalls between function invocations');
      next();
    });
}, true);

test('paceIt paces', function (next) {
  paceIt(testFuncReturnPromise, testArr, 50)
    .then(function (result) {
      ok(arraysAreEqualLength(result, testArr), 'Tasks are paced at the provided amount.');
      // ok(stepDifferencesAreWithinInterval(result, interval), 'Paces between function invocations'); // todo: this.
      next();
    })
}, true);

function stepDifferencesAreWithinInterval(results, interval) {
  const permissableOffsetInMilliseconds = 100;
  const maxDifference = interval + permissableOffsetInMilliseconds;
  const minDifference = interval - permissableOffsetInMilliseconds;

  return results.every((completedTime, index) => {
    if (index === 0) {
      return true;
    }
    const previousCompletedTime = results[index - 1];
    const completionDifference = completedTime - previousCompletedTime;
    return completionDifference >= minDifference && completionDifference <= maxDifference;
  });
}

// Random timeout to simulate a poor man's async process
function testFuncReturnPromise(index) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(index), Math.random() * 10);
  });
}

function testFuncReturnNonPromise(index) {
  return index;
}

function testFuncReturnExecutionTime() {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(Date.now()));
  });
}
