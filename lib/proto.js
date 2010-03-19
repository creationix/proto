var proto = Object.prototype;

// Implements a forEach much like the one for Array.prototype.forEach, but for
// any object.
if (typeof proto.forEach !== 'function') {
  Object.defineProperty(proto, "forEach", {value: function (callback, thisObject) {
    var keys = Object.keys(this);
    var length = keys.length;
    for (var i = 0; i < length; i++){
      key = keys[i];
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
      key = keys[i];
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
      key = keys[i];
      this[key] = obj[key];
    }
    return this;
  }});
}


