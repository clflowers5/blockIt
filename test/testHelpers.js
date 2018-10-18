function arraysAreEqualLength(arr1, arr2) {
  const areEqualLength = arr1.length === arr2.length;
  if (!areEqualLength) {
    console.error('Arrays are not equal length.'); // eslint-disable-line no-console
  }
  return areEqualLength;
}

function arraysAreEqualContentAtIndices(arr1, arr2) {
  const areEqualContentAtIndices = arr1.every((val, idx) => val === arr2[idx]);
  if (!areEqualContentAtIndices) {
    console.error('Arrays are not equal contents.'); // eslint-disable-line no-console
  }
  return areEqualContentAtIndices;
}

function arraysAreEqual(arr1, arr2) {
  return arraysAreEqualLength(arr1, arr2) && arraysAreEqualContentAtIndices(arr1, arr2);
}

function testFuncReturnPromise(index) {
  return new Promise(((resolve) => {
    // Random timeout to simulate a poor man's async process
    setTimeout(() => resolve(index), Math.random() * 10);
  }));
}

function testFuncReturnNonPromise(index) {
  return index;
}

function testFuncReturnExecutionTime() {
  return new Promise(((resolve) => {
    setTimeout(() => resolve(Date.now()));
  }));
}

module.exports = {
  arraysAreEqualLength,
  arraysAreEqualContentAtIndices,
  arraysAreEqual,
  testFuncReturnPromise,
  testFuncReturnExecutionTime,
  testFuncReturnNonPromise,
};
