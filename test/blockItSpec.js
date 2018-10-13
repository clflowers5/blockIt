'use strict';

const test = require('kludjs');
const blockIt = require('../blockIt').blockIt;
const stallIt = require('../blockIt').stallIt;
const paceIt = require('../blockIt').paceIt;

const testArr = [...new Array(300).keys()];

test('blockIt performs in order with Promises', function (next) {
  blockIt(testFuncPromiseReturn, testArr)
    .then(function (result) {
      ok(arraysAreEqual(result, testArr), 'Promises are performed in order and block until resolved.');
      next();
    });
}, true);

test('blockIt performs with non-Promises', function (next) {
  blockIt(testFuncNonPromiseReturn, testArr)
    .then(function (result) {
      ok(arraysAreEqual(result, testArr), 'Functions are performed in order.');
      next();
    });
}, true);

test('stallIt stalls', function (next) {
  stallIt(testFuncPromiseReturn, testArr, 5)
    .then(function (result) {
      ok(arraysAreEqualLength(result, testArr), 'Each task is stalled the provided amount.');
      next();
    });
}, true);

test('paceIt paces', function (next) {
  paceIt(testFuncPromiseReturn, testArr, 50)
    .then(function (result) {
      ok(arraysAreEqualLength(result, testArr), 'Tasks are paced at the provided amount.');
      next();
    })
}, true);

// Random timeout to simulate a poor man's async process
function testFuncPromiseReturn(index) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(index), Math.random() * 10);
  });
}

function testFuncNonPromiseReturn(index) {
  return index;
}

function arraysAreEqualLength(arr1, arr2) {
  return arr1.length === arr2.length;
}

function arraysAreEqualContents(arr1, arr2) {
  return arr1.every((val, idx) => val === arr2[idx]);
}

function arraysAreEqual(arr1, arr2) {
  if (!arraysAreEqualLength(arr1, arr2)) {
    console.error('Arrays are not equal length.');
    return false;
  }

  if (!arraysAreEqualContents(arr1, arr2)) {
    console.error('Arrays are not equal contents.');
    return false;
  }

  return true;
}
