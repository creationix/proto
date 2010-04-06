# Proto

This simple js library adds three functions to Object.prototype and one to Function.prototype that are commonly used.  Since this only modifies global objects and doesn't export any structures, you don't need the return value when calling `require('proto')`.

## Object.prototype

All functions added to `Object.prototype` are usable from any object in JavaScript.

### Object.prototype.forEach

This is the most useful of the additions.  It allows you to forEach over an `Object` instance's local properties and values just like you can already do with `Array` instances.

    require('proto');
    {name: "Tim", age: 28}.forEach(function (value, key) {
      sys.puts(key + " = " + JSON.stringify(value));
    });

### Object.prototype.map

This works like forEach, except returns an `Array` instance with the returned values of the function calls.

    require('proto');
    var pairs = {name: "Tim", age: 28}.map(function (value, key) {
      return key + " = " + value;
    });
    // pairs is ["name = Tim", "age = 28"]

### Object.prototype.mixin

Does a shallow copy from another object into this one.

    require('proto');
    GLOBAL.mixin(require('sys'));
    puts("Hello World");

## Function.prototype

Functions added to `Function.prototype` are available to any JavaScript function.

### Function.prototype.curry

Partially applies a function and returns a new function that accepts the remaining arguments.

    require('proto');
    var fs = require('fs');
    var sys = require('sys');
    // Create a curried version of the readFile function
    var loader = fs.readFile.curry("myfile.txt");
    // Then finish the application of the function
    loader(sys.debug);

