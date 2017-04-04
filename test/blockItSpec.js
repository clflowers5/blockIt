'use strict';

const test = require('kludjs');
const blockIt = require('../blockIt').blockIt;
const stallIt = require('../blockIt').stallIt;
const paceIt = require('../blockIt').paceIt;

const testArr = [...Array(500).keys()];

function arraysAreEqual(arr1, arr2) {
  let equalLength = arr1.length === arr2.length;
  let equalContents = arr1.every((val, idx) => val === arr2[idx]);
  return equalLength && equalContents;
}

test('blockIt performs synchronously', function (next) {
  const testFunc = function (index) {
    return new Promise(function (resolve) {
      resolve(index);
    });
  };

  blockIt(testFunc, testArr)
    .then(function (result) {
      ok(arraysAreEqual(result, testArr), 'Tasks are performed in order and block until resolved.');
      next();
    });
}, true);