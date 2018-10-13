'use strict';

function isFunction(func) {
  return typeof func === 'function';
}

function validateFunction(func) {
  if (!isFunction(func)) {
    throw new Error('Provided value for function is not a function.');
  }
}

function isPromise(func) {
  return func && typeof func.then === 'function';
}

function promisify(value) {
  if (isPromise(value)) {
    return value;
  } else {
    return new Promise(function (resolve) {
      resolve(value);
    });
  }
}

module.exports = {
  blockIt: function (func, arr) {
    return new Promise(function (resolve) {
      const result = [];
      const len = arr.length;
      let complete = 0;

      validateFunction(func);
      arr.reduce(function (promise, item) {
        return promise
          .then(function () {
            const functionReturn = func(item);
            return promisify(functionReturn)
              .then(function (data) {
                result.push(data);
                if (++complete === len) resolve(result);
              });
          });
      }, Promise.resolve());
    });
  },

  stallIt: function (func, arr, interval) {
    validateFunction(func);
    return new Promise(function (resolve) {
      let result = [];
      let complete = 0;
      let len = arr.length;

      arr.map(function (item, index) {
        (function (item) {
          setTimeout(function () {
            func(item)
              .then(function (data) {
                result.push(data);
                if (++complete === len) resolve(result);
              });
          }, interval * index);
        })(item);
      });
    });
  },

  paceIt: function (func, arr, perSecond) {
    let interval = 1000 / perSecond;
    validateFunction(func);
    return new Promise(function (resolve) {
      module.exports.stallIt(func, arr, interval)
        .then(function (result) {
          resolve(result)
        });
    });
  }
};