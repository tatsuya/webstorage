# webstorage

A simple, pluggable, [W3C Web Storage] compliant API for key-value data.

In webstorage, all persistence layer is **pluggable**. You can integrate or reuse webstorage interface across any backends such as in-memory database, local file system, mongodb, redis, etc.

By default, webstorage does not persist data. It means that it will use in-memory object as its backend.

```js
var webstorage = require('webstorage');
var storage = webstorage();

storage.setItem('foo', 'bar');
storage.getItem('foo') // => 'bar'
```

If you want to persist data locally, you can use [webstorage-local] plugin.

```js
var webstorage = require('webstorage');
var local = require('webstorage-local');
var localStorage = webstorage(local('/tmp'));

localStorage.setItem('foo', 'bar');
localStorage.getItem('foo') // => 'bar'
```

## Installation

```
$ npm install webstorage
```

## Plugins

Currently the following plugins are available:

- [webstorage-local]

## API

Check out the [W3C Web Storage] for detailed specification.

### Storage

Exposed by `require('webstorage')`.

### Storage()

Creates a new `Storage`. Works with and without `new`:

```js
var storage = require('webstorage')();
// or
var Storage = require('webstorage');
var storage = new Storage();
```

Each Storage object provides access to a list of key/value pairs. Keys are strings. Any string (including the empty string => TODO) is a valid key. Values are similarly strings.

### Storage(persistence:Persistence)

Creates a new `Storage` and attaches it to the given `persistence`. Default persistence is `webstorage-memory`.

### #length

Returns the number of key/value pairs currently present in the list associated with the object.

### #key(n)

Returns the name of the nth key in the list. The order of keys must be consistent within an object so long as the number of keys doesn't change. If n is greater than or equal to the number of key/value pairs in the object, then this method must return null.

```js
var storage = require('webstorage')();
storage.setItem('foo', 'bar');
storage.key(0); // => 'bar'
storage.key(1); // => null
```

### #getItem(key)

Returns the current value associated with the given key. If the given key does not exist in the list associated with the object then this method must return null.

### #setItem(key, value)

First, checks if a key/value pair with the given key already exists in the list associated with the object. If it does not, then a new key/value pair is added to the list, with the given key and with its value set to value. If the key does exist in the list, then it has its value updated to value.

### #removeItem(key)

Causes the key/value pair with the given key to be removed from the list associated with the object, if it exists. If no item with that key exists,the method does nothing.

### #clear()

Causes the list associated with the object to be emptied of all key/value pairs, if there are any. If there are none, then the method does nothing.

## Persistence Plugin API

### Persistence

The `Persistence` class is an interface represents the persistent data storage. A plugin must be an implementation of this interface.

Here is an example implementation of default in-memory data storage, see full example at `persistent/memory`.

```js
function MemoryStorage() {
  if (!(this instanceof MemoryStorage)) {
    return new MemoryStorage();
  }
}

MemoryStorage.prototype.keys = function() {
  return Object.keys(this);
};

MemoryStorage.prototype.getItem = function(key) {
  return String(this[key]);
};

MemoryStorage.prototype.setItem = function(key, value) {
  this[key] = value;
};

MemoryStorage.prototype.removeItem = function(key) {
  delete this[key];
};

MemoryStorage.prototype.clear = function() {
  var self = this;
  Object.keys(this).forEach(function(key) {
    delete self[key];
  });
};

module.exports = MemoryStorage;
```

### #keys()

Returns all keys stored.

### #getItem(key)

Returns the value associated with the given key.

### #setItem(key, value)

Adds or updates the key/value pair.

### #removeItem(key)

Removes the item with the given key.

### #clear()

Empty all key/value pairs.

## License

MIT

[W3C Web Storage]: http://www.w3.org/TR/webstorage/
[webstorage-local]: https://github.com/tatsuyaoiw/webstorage-local
