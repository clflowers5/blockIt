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
  }
  return new Promise((resolve) => {
    resolve(value);
  });
}

module.exports = {
  blockIt(func, arr) {
    return new Promise((resolve) => {
      const result = [];
      const len = arr.length;
      let complete = 0;

      validateFunction(func);
      arr.reduce((promise, item) => promise
        .then(() => {
          const functionReturn = func(item);
          return promisify(functionReturn)
            .then((data) => {
              result.push(data);
              complete += 1;
              if (complete === len) resolve(result);
            });
        }), Promise.resolve());
    });
  },

  stallIt(func, arr, interval) {
    validateFunction(func);
    return new Promise((resolve) => {
      const result = [];
      let complete = 0;
      const len = arr.length;

      arr.forEach((item, index) => {
        setTimeout(() => {
          func(item)
            .then((data) => {
              result.push(data);
              complete += 1;
              if (complete === len) resolve(result);
            });
        }, interval * index);
      });
    });
  },

  paceIt(func, arr, perSecond) {
    const interval = 1000 / perSecond;
    validateFunction(func);
    return new Promise((resolve) => {
      module.exports.stallIt(func, arr, interval)
        .then((result) => {
          resolve(result);
        });
    });
  },
};
