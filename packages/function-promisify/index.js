module.exports = promisify;

function promisify(fn) {
  if (typeof fn !== 'function') {
    throw new Error('just-promisify expects a function');
  }

  var ctx = this;

  return function() {
    var args = Array.prototype.slice.call(arguments);

    return new Promise(function(resolve) {
      var callback = function(result) {
        resolve(result);
      };

      fn.apply(ctx, args.concat(callback));
    });
  };
}
