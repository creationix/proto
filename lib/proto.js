var proto = Object.prototype;

// Implements a forEach much like the one for Array.prototype.forEach, but for
// and object.
if (typeof proto.forEach !== 'function') {
  Object.defineProperty(proto, "forEach", {enumarable: false, value: function (callback, thisObject) {
    var keys = Object.keys(this);
    var length = keys.length;
    sys.p(keys);
    for (var i = 0; i < length; i++){
      key = keys[i];
      callback.call(thisObject, this[key], key, this);
    }
  }});
}


