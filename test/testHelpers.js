'use strict';

function arraysAreEqualLength(arr1, arr2) {
  const areEqualLength = arr1.length === arr2.length;
  if (!areEqualLength) {
    console.error('Arrays are not equal length.');
  }
  return areEqualLength;
}

function arraysAreEqualContentAtIndices(arr1, arr2) {
  const areEqualContentAtIndices = arr1.every((val, idx) => val === arr2[idx]);
  if (!areEqualContentAtIndices) {
    console.error('Arrays are not equal contents.');
  }
  return areEqualContentAtIndices;
}

function arraysAreEqual(arr1, arr2) {
  return arraysAreEqualLength(arr1, arr2) && arraysAreEqualContentAtIndices(arr1, arr2);
}

module.exports = {
  arraysAreEqualLength,
  arraysAreEqualContentAtIndices,
  arraysAreEqual,
};
