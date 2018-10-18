const test = require('kludjs');
const testHelpers = require('./testHelpers');
const { blockIt, stallIt, paceIt } = require('../blockIt');

const testArr = [...new Array(300).keys()];

function stepDifferencesAreWithinInterval(results, interval) {
  const permissableOffsetInMilliseconds = 100;
  const maxDifference = interval + permissableOffsetInMilliseconds;
  const minDifference = interval - permissableOffsetInMilliseconds;

  return results.every((completionTime, index) => {
    if (index === 0) {
      return true;
    }
    const previousCompletionTime = results[index - 1];
    const completionDifference = completionTime - previousCompletionTime;
    return completionDifference >= minDifference && completionDifference <= maxDifference;
  });
}

function groupingsAreExecutedPerSecond(results, executionsPerSecond) {
  const permissableOffsetInMilliseconds = 100;
  let groupingTime;
  let previousGroupingStartTime;
  return results.every((completionTime, index) => {
    if (index < executionsPerSecond) {
      return true;
    }

    if (index % executionsPerSecond === 0) {
      groupingTime = completionTime;
      previousGroupingStartTime = index === 0 ? 0 : results[index - executionsPerSecond];
    }

    const maxGroupingTimeWithinSecond = groupingTime + 1000;
    const completionTimeIsWithinBoundary = completionTime >= groupingTime && completionTime <= maxGroupingTimeWithinSecond;
    const completionTimeIsWithinNextSecond = completionTime + permissableOffsetInMilliseconds >= previousGroupingStartTime + 1000;
    return completionTimeIsWithinBoundary && completionTimeIsWithinNextSecond;
  });
}

test('blockIt performs in order with Promises', (next) => {
  blockIt(testHelpers.testFuncReturnPromise, testArr)
    .then((result) => {
      ok(testHelpers.arraysAreEqual(result, testArr), 'Promises are performed in order and block until resolved.');
      next();
    });
}, true);

test('blockIt performs with non-Promises', (next) => {
  blockIt(testHelpers.testFuncReturnNonPromise, testArr)
    .then((result) => {
      ok(testHelpers.arraysAreEqual(result, testArr), 'Functions are performed in order.');
      next();
    });
}, true);

test('stallIt stalls', (next) => {
  const interval = 5;
  stallIt(testHelpers.testFuncReturnExecutionTime, testArr, interval)
    .then((result) => {
      ok(testHelpers.arraysAreEqualLength(result, testArr), 'stallIt operates on all inputs.');
      ok(stepDifferencesAreWithinInterval(result, interval), 'Stalls between function invocations');
      next();
    });
}, true);

test('paceIt paces', (next) => {
  const executionsPerSecond = 75;
  paceIt(testHelpers.testFuncReturnExecutionTime, testArr, executionsPerSecond)
    .then((result) => {
      ok(testHelpers.arraysAreEqualLength(result, testArr), 'Tasks are paced at the provided amount.');
      ok(groupingsAreExecutedPerSecond(result, executionsPerSecond), 'Paces between function invocations');
      next();
    });
}, true);
