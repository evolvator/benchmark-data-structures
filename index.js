var Benchmark = require('benchmark');
var tb = require('travis-benchmark');
var _ = require('lodash');

var async = require('async');

var LinkedList = require('linked-list');

class Item extends Item {
    constructor(value) {
        super();
        this.value = value;
    }
}

async.timesSeries(
  14,
  function(t, next) {
    var count = Math.pow(2, t + 1);
    
    async.series([
      function(next) {
        var suite = new Benchmark.Suite(`push x${count} pow${t + 1}`);
        
        // array
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
        
        // object
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
        
        // linked list
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
        
        // linked-list@1.0.4
        (function() {
          var list;
          list = new LinkedList();
          _.times(count, function(t) { list.append(new Item(t)); });
          suite.add({
            name: 'linked-list@1.0.4',
            onCycle: function() {
              list = new LinkedList();
              _.times(count, function(t) { list.append(new Item(t)); });
            },
            fn: function() {
              list.append(new Item('test'));
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`unshift x${count} pow${t + 1}`);
        
        // array
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
        
        // object
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
        
        // linked list
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
        
        // linked-list@1.0.4
        (function() {
          var list;
          list = new LinkedList();
          _.times(count, function(t) { list.append(new Item(t)); });
          suite.add({
            name: 'linked-list@1.0.4',
            onCycle: function() {
              list = new LinkedList();
              _.times(count, function(t) { list.append(new Item(t)); });
            },
            fn: function() {
              list.prepend(new Item('test'));
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`pop x${count} pow${t + 1}`);
        
        // array
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
        
        // object
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
        
        // linked list
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
              if (last.prev) last = last.prev;
              if (last.next) delete last.next;
            }
          });
        })();
        
        // linked-list@1.0.4
        (function() {
          var list;
          list = new LinkedList();
          _.times(count, function(t) { list.append(new Item(t)); });
          suite.add({
            name: 'linked-list@1.0.4',
            onCycle: function() {
              list = new LinkedList();
              _.times(count, function(t) { list.append(new Item(t)); });
            },
            fn: function() {
              if (list.tail) list.tail.detach();
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`shift x${count} pow${t + 1}`);
        
        // array
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
        
        // object
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
        
        // linked list
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
              if (first.next) {
                first = first.next;
                delete first.prev;
              }
            }
          });
        })();
        
        // linked-list@1.0.4
        (function() {
          var list;
          list = new LinkedList();
          _.times(count, function(t) { list.append(new Item(t)); });
          suite.add({
            name: 'linked-list@1.0.4',
            onCycle: function() {
              list = new LinkedList();
              _.times(count, function(t) { list.append(new Item(t)); });
            },
            fn: function() {
              if (list.head) list.head.detach();
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`splice middle - x${count} pow${t + 1}`);
        var middleIndex = Math.round(count / 2);
        
        // array
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
        
        // object
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
        
        // linked list
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
              if (middle.prev) middle.prev.next = middle.next;
              if (middle.next) middle.next.prev = middle.prev;
              if (middle === first) first = middle.next;
              if (middle === last) last = middle.prev;
            }
          });
        })();
        
        // linked-list@1.0.4
        (function() {
          var list, middle;
          list = new LinkedList();
          _.times(count - 1, function(t) {
            list.append(new Item(t));
            if (t === middleIndex) middle = list.tail;
          });
          suite.add({
            name: 'linked-list@1.0.4',
            onCycle: function() {
              list = new LinkedList();
              _.times(count - 1, function(t) {
                list.append(new Item(t));
                if (t === middleIndex) middle = list.tail;
              });
            },
            fn: function() {
              if (middle) middle.detach();
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`splice middle + x${count} pow${t + 1}`);
        var middleIndex = Math.round(count / 2);
        
        // array
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
        
        // object
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
        
        // linked list
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
              var created = { data: 'test', prev: middle.prev, next: middle };
              if (created.prev) created.prev.next = created;
              middle.prev = created;
              if (middle === first) first = created;
            }
          });
        })();
        
        // linked-list@1.0.4
        (function() {
          var list, middle;
          list = new LinkedList();
          _.times(count - 1, function(t) {
            list.append(new Item(t));
            if (t === middleIndex) middle = list.tail;
          });
          suite.add({
            name: 'linked-list@1.0.4',
            onCycle: function() {
              list = new LinkedList();
              _.times(count - 1, function(t) {
                list.append(new Item(t));
                if (t === middleIndex) middle = list.tail;
              });
            },
            fn: function() {
              if (middle) middle.append(new Item('test'));
            }
          });
        })();
        
        tb.wrapSuite(suite, function () { next(); });
        suite.run({ async: true });
      },
      function(next) {
        var suite = new Benchmark.Suite(`sort x${count} pow${t + 1}`);
        
        // array
        (function() {
          var array;
          array = _.times(count, function(t) { return t; });
          var option = function(a,b) {
            if (a.number > b.number) return 1;
            if (a.number < b.number) return -1;
            return 0;
          };
          suite.add({
            name: 'array',
            fn: function() {
              array.sort(option);
            }
          });
        })();
        
        // object
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
              var a, b, i, t;
              for (i = 0; i < object.length; i++) {
                for (a = 0; a < object.length - 1; a++) {
                  b = a + 1;
                  if (object[a] < object[b]) {
                    t = object[a];
                    object[a] = object[b];
                    object[b] = t;
                  }
                }
              }
            }
          });
        })();
        
        // linked-list@1.0.4
        (function() {
          var list;
          list = new LinkedList();
          _.times(count, function(t) { list.append(new Item(t)); });
          suite.add({
            name: 'linked-list@1.0.4',
            onCycle: function() {
              list = new LinkedList();
              _.times(count, function(t) { list.append(new Item(t)); });
            },
            fn: function() {
              var a, b, i;
              for (i = 0; i < count; i++) {
                for (a = list.head; a; a = a.next) {
                  if (a.next) {
                    b = a.next;
                    if (a.value < b.value) {
                      a.detach();
                      b.append(a);
                      a = b;
                    }
                  }
                }
              }
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
