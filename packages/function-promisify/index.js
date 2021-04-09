module.exports = promisify;

function promisify(fn) {
  var ctx = this;

  return function() {
    var args = arguments;

    return new Promise(function(resolve) {
      var callback = function(result) {
        resolve(result);
      };

      fn.apply(ctx, args.concat(callback));
    });
  };
}
