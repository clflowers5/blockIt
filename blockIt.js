'use strict';

module.exports = {
  blockIt: function (func, arr) {
    return new Promise(function (resolve) {
      var result = [];
      var complete = 0;
      var len = arr.length;

      arr.reduce(function (promise, item) {
        return promise.then(function () {
          return func(item)
            .then(function (data) {
              result.push(data);
              if (++complete === len) resolve(result);
            });
        });
      }, Promise.resolve());
    });
  },

  stallIt: function (func, arr, interval) {
    return new Promise(function (resolve) {
      var result = [];
      var complete = 0;
      var stall = 0;
      var len = arr.length;

      arr.map(function (item) {
        (function (item) {
          setTimeout(function () {
            func(item)
              .then(function (data) {
                result.push(data);
                if (++complete === len) resolve(result);
              });
          }, interval * stall);
          ++stall;
        })(item);
      });
    });
  },

  paceIt: function (func, arr, perSecond) {
    var interval = 1000 / perSecond;
    return new Promise(function (resolve) {
      module.exports.stallIt(func, arr, interval)
        .then(function (result) {
          resolve(result)
        });
    });
  }
};