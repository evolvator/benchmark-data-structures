var Benchmark = require('benchmark');
var tb = require('travis-benchmark');
var _ = require('lodash');

var async = require('async');

async.timesSeries(
  15,
  function(t, next) {
    var count = Math.pow(2, t);
    
    async.series([
      function(next) {
        var suite = new Benchmark.Suite(`push, ${count} size`);
        
        (function() {
          var array;
          array = _.times(count, function(t) { return t; });
          suite.add({
            name: 'array',
            onCycle: function() {
              array = _.times(count, function(t) { return t; });
            },
            fn: function() {
              array.push('test');
            }
          });
        })();
        
        (function() {
          var object;
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
          suite.add({
            name: 'object',
            onCycle: function() {
              object = { length: 0 };
              _.times(count, function(t) {
                object[t] = t;
                object.length++;
              });
            },
            fn: function() {
              object[object.length] = 'test';
              object.length++;
            }
          });
        })();
        
        (function() {
          var first, last;
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
          suite.add({
            name: 'doubly linked list',
            onCycle: function() {
              first = last = { data: 0 };
              _.times(count - 1, function(t) {
                last.next = { data: t + 1, prev: last };
                last = last.next;
              });
            },
            fn: function() {
              last.next = { data: 'test', prev: last };
              last = last.next;
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`unshift, ${count} size`);
        
        (function() {
          var array;
          array = _.times(count, function(t) { return t; });
          suite.add({
            name: 'array',
            onCycle: function() {
              array = _.times(count, function(t) { return t; });
            },
            fn: function() {
              array.unshift('test');
            }
          });
        })();
        
        (function() {
          var object;
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
          suite.add({
            name: 'object',
            onCycle: function() {
              object = { length: 0 };
              _.times(count, function(t) {
                object[t] = t;
                object.length++;
              });
            },
            fn: function() {
              for (var i = object.length - 1; i >= 0; i--) {
                object[i + 1] = object[i];
              }
              object[0] = 'test';
              object.length++;
            }
          });
        })();
        
        (function() {
          var first, last;
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
          suite.add({
            name: 'doubly linked list',
            onCycle: function() {
              first = last = { data: 0 };
              _.times(count - 1, function(t) {
                last.next = { data: t + 1, prev: last };
                last = last.next;
              });
            },
            fn: function() {
              var created = { data: 'test', next: first };
              first.prev = created;
              first = created;
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`pop, ${count} size`);
        
        (function() {
          var array;
          array = _.times(count, function(t) { return t; });
          suite.add({
            name: 'array',
            onCycle: function() {
              array = _.times(count, function(t) { return t; });
            },
            fn: function() {
              array.pop();
            }
          });
        })();
        
        (function() {
          var object;
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
          suite.add({
            name: 'object',
            onCycle: function() {
              object = { length: 0 };
              _.times(count, function(t) {
                object[t] = t;
                object.length++;
              });
            },
            fn: function() {
              delete object[object.length - 1];
              object.length--;
            }
          });
        })();
        
        (function() {
          var first, last;
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
          suite.add({
            name: 'doubly linked list',
            onCycle: function() {
              first = last = { data: 0 };
              _.times(count - 1, function(t) {
                last.next = { data: t + 1, prev: last };
                last = last.next;
              });
            },
            fn: function() {
              last = last.prev;
              if (last) delete last.next;
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`shift, ${count} size`);
        
        (function() {
          var array;
          array = _.times(count, function(t) { return t; });
          suite.add({
            name: 'array',
            onCycle: function() {
              array = _.times(count, function(t) { return t; });
            },
            fn: function() {
              array.shift();
            }
          });
        })();
        
        (function() {
          var object;
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
          suite.add({
            name: 'object',
            onCycle: function() {
              object = { length: 0 };
              _.times(count, function(t) {
                object[t] = t;
                object.length++;
              });
            },
            fn: function() {
              delete object[0];
              for (var i = 1; i < object.length - 1; i++) {
                object[i - 1] = object[i];
              }
              object.length--;
            }
          });
        })();
        
        (function() {
          var first, last;
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
          suite.add({
            name: 'doubly linked list',
            onCycle: function() {
              first = last = { data: 0 };
              _.times(count - 1, function(t) {
                last.next = { data: t + 1, prev: last };
                last = last.next;
              });
            },
            fn: function() {
              first = first.next;
              delete first.prev;
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`splice middle -1, ${count} size`);
        var middleIndex = Math.round(count / 2);
        
        (function() {
          var array;
          array = _.times(count, function(t) { return t; });
          suite.add({
            name: 'array',
            onCycle: function() {
              array = _.times(count, function(t) { return t; });
            },
            fn: function() {
              array.splice(middleIndex, 1);
            }
          });
        })();
        
        (function() {
          var object;
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
          suite.add({
            name: 'object',
            onCycle: function() {
              object = { length: 0 };
              _.times(count, function(t) {
                object[t] = t;
                object.length++;
              });
            },
            fn: function() {
              delete object[middleIndex];
              for (var i = middleIndex + 1; i < object.length - 1; i++) {
                object[i - 1] = object[i];
              }
              object.length--;
            }
          });
        })();
        
        (function() {
          var first, last, middle;
          first = last = middle = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
            if (t === middleIndex) middle = last;
          });
          suite.add({
            name: 'doubly linked list',
            onCycle: function() {
              first = last = middle = { data: 0 };
              _.times(count - 1, function(t) {
                last.next = { data: t + 1, prev: last };
                last = last.next;
                if (t === middleIndex) middle = last;
              });
            },
            fn: function() {
              middle.prev.next = middle.next;
              middle.next.prev = middle.prev;
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`splice middle +1, ${count} size`);
        var middleIndex = Math.round(count / 2);
        
        (function() {
          var array;
          array = _.times(count, function(t) { return t; });
          suite.add({
            name: 'array',
            onCycle: function() {
              array = _.times(count, function(t) { return t; });
            },
            fn: function() {
              array.splice(middleIndex, 0, 'test');
            }
          });
        })();
        
        (function() {
          var object;
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
          suite.add({
            name: 'object',
            onCycle: function() {
              object = { length: 0 };
              _.times(count, function(t) {
                object[t] = t;
                object.length++;
              });
            },
            fn: function() {
              for (var i = object.length - 1; i >= middleIndex; i--) {
                object[i + 1] = object[i];
              }
              object[middleIndex] = 'test';
              object.length++;
            }
          });
        })();
        
        (function() {
          var first, last, middle;
          first = last = middle = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
            if (t === middleIndex) middle = last;
          });
          suite.add({
            name: 'doubly linked list',
            onCycle: function() {
              first = last = middle = { data: 0 };
              _.times(count - 1, function(t) {
                last.next = { data: t + 1, prev: last };
                last = last.next;
                if (t === middleIndex) middle = last;
              });
            },
            fn: function() {
              var created = { data: 0, prev: middle.prev, next: middle };
              middle.prev.next = created;
              middle.prev = created;
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
    ], function() {
      next();
    });
  }
);
