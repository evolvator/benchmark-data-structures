"use strict";

var Benchmark = require("benchmark");
var tb = require("travis-benchmark");
var _ = require("lodash");
var async = require("async");
var LinkedList = require("linked-list");

class Item extends LinkedList.Item {
  constructor(value) {
    super();
    this.value = value;
  }
}

var action = !!(process && process.env && process.env.ACTION ? process.env.ACTION : 0);
var t = parseFloat(
  process && process.env && process.env.POW ? process.env.POW : 1
);

var count = Math.pow(2, t + 1);
var middleIndex = Math.round((count - 1) / 2);

var actions = {
  push: {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        onCycle: function() {
          array = _.times(count, function(t) {
            return t;
          });
        },
        fn: function() {
          array.push("test");
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
        onCycle: function() {
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
        },
        fn: function() {
          object[object.length] = "test";
          object.length++;
        }
      });
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          map.set(map.size, "test");
        }
      });
    },
    "linked list": () => {
      var first, last;
      first = last = { data: 0 };
      _.times(count - 1, function(t) {
        last.next = { data: t + 1, prev: last };
        last = last.next;
      });
      var action = function() {
        last.next = { data: "test", prev: last };
        last = last.next;
      };
      suite.add({
        name: "doubly linked list",
        onCycle: function() {
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
        },
        fn: function() {
          action();
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list;
      list = new LinkedList();
      _.times(count, function(t) {
        list.append(new Item(t));
      });
      suite.add({
        name: "linked-list@1.0.4",
        onCycle: function() {
          list = new LinkedList();
          _.times(count, function(t) {
            list.append(new Item(t));
          });
        },
        fn: function() {
          list.append(new Item("test"));
        }
      });
    }
  },
  unshift: {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        onCycle: function() {
          array = _.times(count, function(t) {
            return t;
          });
        },
        fn: function() {
          array.unshift("test");
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
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
          object[0] = "test";
          object.length++;
        }
      });
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          var size = map.size;
          for (var i = size - 1; i >= 0; i--) {
            map.set(i + 1, map[i]);
          }
          map.set(0, "test");
        }
      });
    },
    "linked list": () => {
      var first, last;
      first = last = { data: 0 };
      _.times(count - 1, function(t) {
        last.next = { data: t + 1, prev: last };
        last = last.next;
      });
      var action = function() {
        var created = { data: "test", next: first };
        first.prev = created;
        first = created;
      };
      suite.add({
        name: "doubly linked list",
        onCycle: function() {
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
        },
        fn: function() {
          action();
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list;
      list = new LinkedList();
      _.times(count, function(t) {
        list.append(new Item(t));
      });
      suite.add({
        name: "linked-list@1.0.4",
        onCycle: function() {
          list = new LinkedList();
          _.times(count, function(t) {
            list.append(new Item(t));
          });
        },
        fn: function() {
          list.prepend(new Item("test"));
        }
      });
    }
  },
  pop: {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        onCycle: function() {
          array = _.times(count, function(t) {
            return t;
          });
        },
        fn: function() {
          array.pop();
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
        onCycle: function() {
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
        },
        fn: function() {
          var result = object[object.length - 1];
          delete object[object.length - 1];
          object.length--;
        }
      });
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          var result = map.get(map.size - 1);
          map.delete(map.size - 1);
        }
      });
    },
    "linked list": () => {
      var first, last;
      first = last = { data: 0 };
      _.times(count - 1, function(t) {
        last.next = { data: t + 1, prev: last };
        last = last.next;
      });
      var action = function() {
        if (last.prev) last = last.prev;
        if (last.next) delete last.next;
      };
      suite.add({
        name: "doubly linked list",
        onCycle: function() {
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
        },
        fn: function() {
          action();
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list;
      list = new LinkedList();
      _.times(count, function(t) {
        list.append(new Item(t));
      });
      suite.add({
        name: "linked-list@1.0.4",
        onCycle: function() {
          list = new LinkedList();
          _.times(count, function(t) {
            list.append(new Item(t));
          });
        },
        fn: function() {
          if (list.tail) list.tail.detach();
        }
      });
    }
  },
  shift: {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        onCycle: function() {
          array = _.times(count, function(t) {
            return t;
          });
        },
        fn: function() {
          array.shift();
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
        onCycle: function() {
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
        },
        fn: function() {
          var result = object[0];
          delete object[0];
          for (var i = 1; i < object.length - 1; i++) {
            object[i - 1] = object[i];
          }
          object.length--;
        }
      });
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          var result = map.get(0);
          map.delete(0);
          var size = map.size;
          for (var i = 1; i < size - 1; i++) {
            map.set(i - 1, map.get(i));
          }
        }
      });
    },
    "linked list": () => {
      var first, last;
      first = last = { data: 0 };
      _.times(count - 1, function(t) {
        last.next = { data: t + 1, prev: last };
        last = last.next;
      });
      var action = function() {
        if (first.next) {
          first = first.next;
          delete first.prev;
        }
      };
      suite.add({
        name: "doubly linked list",
        onCycle: function() {
          first = last = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
          });
        },
        fn: function() {
          action();
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list;
      list = new LinkedList();
      _.times(count, function(t) {
        list.append(new Item(t));
      });
      suite.add({
        name: "linked-list@1.0.4",
        onCycle: function() {
          list = new LinkedList();
          _.times(count, function(t) {
            list.append(new Item(t));
          });
        },
        fn: function() {
          if (list.head) list.head.detach();
        }
      });
    }
  },
  "splice middle -": {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        onCycle: function() {
          array = _.times(count, function(t) {
            return t;
          });
        },
        fn: function() {
          array.splice(middleIndex, 1);
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
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
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          var size = map.size;
          map.delete(middleIndex);
          for (var i = middleIndex + 1; i < size - 1; i++) {
            map.set(i - 1, map.get(i));
          }
        }
      });
    },
    "linked list": () => {
      var first, last, middle;
      first = last = middle = { data: 0 };
      _.times(count - 1, function(t) {
        last.next = { data: t + 1, prev: last };
        last = last.next;
        if (t === middleIndex) middle = last;
      });
      var action = function() {
        if (middle.prev) middle.prev.next = middle.next;
        if (middle.next) middle.next.prev = middle.prev;
        if (middle === first) first = middle.next;
        if (middle === last) last = middle.prev;
      };
      suite.add({
        name: "doubly linked list",
        onCycle: function() {
          first = last = middle = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
            if (t === middleIndex) middle = last;
          });
        },
        fn: function() {
          action();
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list, middle;
      list = new LinkedList();
      _.times(count - 1, function(t) {
        list.append(new Item(t));
        if (t === middleIndex) middle = list.tail;
      });
      suite.add({
        name: "linked-list@1.0.4",
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
    }
  },
  "splice middle +": {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        onCycle: function() {
          array = _.times(count, function(t) {
            return t;
          });
        },
        fn: function() {
          array.splice(middleIndex, 0, "test");
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
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
          object[middleIndex] = "test";
          object.length++;
        }
      });
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          var size = map.size;
          for (var i = size - 1; i >= middleIndex; i--) {
            map.set(i + 1, map.get(i));
          }
          map.set(middleIndex, "test");
        }
      });
    },
    "linked list": () => {
      var first, last, middle;
      first = last = middle = { data: 0 };
      _.times(count - 1, function(t) {
        last.next = { data: t + 1, prev: last };
        last = last.next;
        if (t === middleIndex) middle = last;
      });
      var action = function() {
        var created = { data: "test", prev: middle.prev, next: middle };
        if (created.prev) created.prev.next = created;
        middle.prev = created;
        if (middle === first) first = created;
      };
      suite.add({
        name: "doubly linked list",
        onCycle: function() {
          first = last = middle = { data: 0 };
          _.times(count - 1, function(t) {
            last.next = { data: t + 1, prev: last };
            last = last.next;
            if (t === middleIndex) middle = last;
          });
        },
        fn: function() {
          action();
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list, middle;
      list = new LinkedList();
      _.times(count - 1, function(t) {
        list.append(new Item(t));
        if (t === middleIndex) middle = list.tail;
      });
      suite.add({
        name: "linked-list@1.0.4",
        onCycle: function() {
          list = new LinkedList();
          _.times(count - 1, function(t) {
            list.append(new Item(t));
            if (t === middleIndex) middle = list.tail;
          });
        },
        fn: function() {
          if (middle) middle.append(new Item("test"));
        }
      });
    }
  },
  sort: {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      var option = function(a, b) {
        if (a.number > b.number) return 1;
        if (a.number < b.number) return -1;
        return 0;
      };
      suite.add({
        name: "array",
        fn: function() {
          array.sort(option);
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
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
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          var a, b, i, t;
          for (i = 0; i < map.size; i++) {
            for (a = 0; a < map.size - 1; a++) {
              b = a + 1;
              if (map.get(a) < map.get(b)) {
                t = map.get(a);
                map.set(a, map.get(b));
                map.set(b, t);
              }
            }
          }
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list;
      list = new LinkedList();
      _.times(count, function(t) {
        list.append(new Item(t));
      });
      suite.add({
        name: "linked-list@1.0.4",
        onCycle: function() {
          list = new LinkedList();
          _.times(count, function(t) {
            list.append(new Item(t));
          });
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
    }
  },
  get: {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        fn: function() {
          var result = array[middleIndex];
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
        fn: function() {
          var result = object[middleIndex];
        }
      });
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        fn: function() {
          map.get(middleIndex);
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list;
      list = new LinkedList();
      var middleItem;
      _.times(count, function(t) {
        var item = new Item(t);
        list.append(item);
        if (t === middleIndex) middleItem = item;
      });
      suite.add({
        name: "linked-list@1.0.4",
        fn: function() {
          var result = middleItem;
        }
      });
    }
  },
  set: {
    array: () => {
      var array;
      array = _.times(count, function(t) {
        return t;
      });
      suite.add({
        name: "array",
        onCycle: function() {
          array = _.times(count, function(t) {
            return t;
          });
        },
        fn: function() {
          array[middleIndex] = "test";
        }
      });
    },
    object: () => {
      var object;
      object = { length: 0 };
      _.times(count, function(t) {
        object[t] = t;
        object.length++;
      });
      suite.add({
        name: "object",
        onCycle: function() {
          object = { length: 0 };
          _.times(count, function(t) {
            object[t] = t;
            object.length++;
          });
        },
        fn: function() {
          object[middleIndex] = "test";
        }
      });
    },
    map: () => {
      var map;
      map = new Map();
      _.times(count, function(t) {
        map.set(t, t);
      });
      suite.add({
        name: "map",
        onCycle: function() {
          map = new Map();
          _.times(count, function(t) {
            map.set(t, t);
          });
        },
        fn: function() {
          map.set(middleIndex, "test");
        }
      });
    },
    "linked-list@1.0.4": () => {
      var list;
      list = new LinkedList();
      var middleItem;
      _.times(count, function(t) {
        var item = new Item(t);
        list.append(item);
        if (t === middleIndex) middleItem = item;
      });
      suite.add({
        name: "linked-list@1.0.4",
        onCycle: function() {
          list = new LinkedList();
          var middleItem;
          _.times(count, function(t) {
            var item = new Item(t);
            list.append(item);
            if (t === middleIndex) middleItem = item;
          });
        },
        fn: function() {
          middleItem.value = "test";
        }
      });
    }
  }
};

if (!action) {
  async.eachOf(actions, (types, action, next) => {
    if (action === 'sort') return next();
    async.eachOf(types, (type, name, next) => {
      var suite = new Benchmark.Suite(`${name} x${count} pow${t + 1}`);

      type();
    
      tb.wrapSuite(suite, next);
      suite.run({ async: true });
    }, next);
  });
} else {
  async.eachOf(actions['sort'], (type, name, next) => {
    var suite = new Benchmark.Suite(`${name} x${count} pow${t + 1}`);
      
    type();
  
    tb.wrapSuite(suite, next);
    suite.run({ async: true });
  });
}
