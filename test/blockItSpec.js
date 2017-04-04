'use strict';

const test = require('kludjs');
const blockIt = require('../blockIt').blockIt;
const stallIt = require('../blockIt').stallIt;
const paceIt = require('../blockIt').paceIt;

const testArr = [...new Array(300).keys()];

test('blockIt performs synchronously', function (next) {

  blockIt(testFunc, testArr)
    .then(function (result) {
      ok(arraysAreEqual(result, testArr), 'Tasks are performed in order and block until resolved.');
      next();
    });

}, true);

test('stallIt stalls', function (next) {

  stallIt(testFunc, testArr, 5)
    .then(function (result) {
      ok(arraysAreEqualLength(result, testArr), 'Each task is stalled the provided amount.');
      next();
    });

}, true);

test('paceIt paces', function (next) {

  paceIt(testFunc, testArr, 100)
    .then(function (result) {
      ok(arraysAreEqualLength(result, testArr), 'Tasks are paced at the provided amount.');
      next();
    })

}, true);



// Random timeout to simulate a poor man's async process
function testFunc(index) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(index), Math.random() * 11);
  });
}

function arraysAreEqualLength(arr1, arr2) {
  return arr1.length === arr2.length;
}

function arraysAreEqualContents(arr1, arr2) {
  return arr1.every((val, idx) => val === arr2[idx]);
}

function arraysAreEqual(arr1, arr2) {
  return arraysAreEqualLength(arr1, arr2) && arraysAreEqualContents(arr1, arr2);
}
