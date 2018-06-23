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
        var suite = new Benchmark.Suite(`push operation, ${count} size`);
        
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
            last.next = { data: t + 1 };
            last = last.next;
          });
          suite.add({
            name: 'linked list',
            onCycle: function() {
              first = last = { data: 0 };
              _.times(count - 1, function(t) {
                last.next = { data: t + 1 };
                last = last.next;
              });
            },
            fn: function() {
              last.next = { data: 'test' };
              last = last.next;
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
    ], function() {
      next();
    });
  }
);
