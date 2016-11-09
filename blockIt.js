'use strict';

module.exports = {
  blockIt: function (func, arr) {
    return arr.reduce(function (promise, item) {
      return promise.then(function () {
        return func(item);
      });
    }, Promise.resolve());
  },

  stallIt: function (func, arr, interval) {
    var current = 0;
    return arr.reduce(function (promise, item) {
      (function (item) {
        setTimeout(function () {
          return func(item);
        }, interval * current);
      })(item);
      current++;
    });
  },

  paceIt: function (func, arr, perSecond) {
    var interval = 1000 / perSecond;
    return module.exports.stallIt(func, arr, interval);
  }
};