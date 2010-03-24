var proto = Object.prototype;

// Implements a forEach much like the one for Array.prototype.forEach, but for
// any object.
if (typeof proto.forEach !== 'function') {
  Object.defineProperty(proto, "forEach", {value: function (callback, thisObject) {
    var keys = Object.keys(this);
    var length = keys.length;
    for (var i = 0; i < length; i++){
      var key = keys[i];
      callback.call(thisObject, this[key], key, this);
    }
  }});
}

// Implements a map much like the one for Array.prototype.map, but for any
// object. Returns an array, not a generic object.
if (typeof proto.map !== 'function') {
  Object.defineProperty(proto, "map", {value: function (callback, thisObject) {
    var accum = [];
    var keys = Object.keys(this);
    var length = keys.length;
    for (var i = 0; i < length; i++){
      var key = keys[i];
      accum[i] = callback.call(thisObject, this[key], key, this);
    }
    return accum;
  }});
}

// Implements a shallow copy onto the current object.
if (typeof proto.mixin !== 'function') {
  Object.defineProperty(proto, "mixin", {value: function (obj) {
    var keys = Object.keys(obj);
    var length = keys.length;
    for (var i = 0; i < length; i++){
      var key = keys[i];
      this[key] = obj[key];
    }
    return this;
  }});
}

// Implements a function curry function.  This allows you to call part of a
// function later.
if (typeof func_proto.curry !== 'function') {
  Object.defineProperty(func_proto, "curry", {value: function () {
    var fn = this;
    var first = arr_proto.slice.call(arguments);
    return function () {
      return fn.apply(this, first.concat(arr_proto.slice.call(arguments)));
    };
  }});
}

if (typeof func_proto.single !== 'function') {
  Object.defineProperty(func_proto, "single", {value: function () {
    var fn = this;
    var first = arr_proto.slice.call(arguments);
    return function () {
      return fn.apply(this, first.concat([this]));
    };
  }});
}

// Inspired by http://github.com/willconant/flow-js
Function.step = function step() {
  var steps = Array.prototype.slice.call(arguments),
      counter, results;
  function next() {
    if (steps.length <= 0) { return; }
    var fn = steps.shift();
    counter = 0;
    results = [];
    fn.apply(next, arguments);
  }
  next.parallel = function () {
    var i = counter;
    counter++;
    return function () {
      counter--;
      results[i] = arguments;
      if (counter <= 0) {
        next(results);
      }
    };
  };
  next([]);
};

var fs = require('fs');
var sys = require('sys');

Function.step(
  fs.readdir.single(__dirname),

  function (err, paths) {
    var parallel = this.parallel;
    paths.forEach(function (path) {
      fs.readFile(path, parallel());
    });
  },
  sys.p
);

