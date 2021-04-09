var test = require('../util/test')(__filename);
var promisify = require('../../packages/function-promisify');

test('transform a callback-based fn into a fn that returns a promise', function(t) {
  t.plan(1);

  var output = ['queue', 'stack', 'linked-list'];
  var fn = function(callback) {
    callback(output);
  };

  var promisified = promisify(fn);
  promisified().then(function(result) {
    t.deepEqual(result, output);
    t.end();
  });
});

test('promisify function with multiple parameters', function(t) {
  t.plan(1);

  var fn = function(str, arr, callback) {
    callback(`${str} - ${arr.join(', ')}`);
  };

  var promisified = promisify(fn);

  promisified('javascript', ['typescript', 'elm']).then(function(result) {
    t.equal(result, 'javascript - typescript, elm');
    t.end();
  });
});

test('throws an error if parameter is not a function', function(t) {
  t.plan(5);

  t.throws(function() {
    promisify();
  });

  t.throws(function() {
    promisify(1);
  });

  t.throws(function() {
    promisify(undefined);
  });

  t.throws(function() {
    promisify('javascript');
  });

  t.throws(function() {
    promisify(['queue', 'stack', 'linked-list']);
  });

  t.end();
});
