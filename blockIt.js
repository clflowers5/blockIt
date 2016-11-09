"use strict";

var blockIt = {
  blockIt: function (arr, func) {
    return arr.reduce(function (promise, item) {
      return promise.then(function () {
        return func(item);
      });
    }, Promise.resolve());
  },

  throttleIt: function (arr, func, interval) {
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

  paceIt: function (arr, func, perSecond) {
    var interval = 1000 / perSecond;
    return blockIt.throttleIt(arr, func, interval);
  }
};

module.exports = blockIt;