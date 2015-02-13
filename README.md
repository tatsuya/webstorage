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

If you want to persist data locally, you can use `webstorage-local` plugin.

```js
var webstorage = require('webstorage');
var local = require('webstorage-local');
var localStorage = webstorage(local('/tmp'));

localStorage.setItem('foo', 'bar');
localStorage.getItem('foo') // => 'bar'
```

```js
var os = require('os');
var LocalStorage = require('webstorage-local');
var localStorage = new WebStorage(new LocalStorage(os.tmpdir()));

localStorage.setItem('foo', 'bar');
localStorage.getItem('foo') // => 'bar'
```

## Installation

```
npm install webstorage
```

## API

Check out the [W3C Web Storage] specification for details.

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

### Storage#length

Returns the number of key/value pairs currently present in the list associated with the object.

### storage#key(n)

Returns the name of the nth key in the list. The order of keys must be consistent within an object so long as the number of keys doesn't change. If n is greater than or equal to the number of key/value pairs in the object, then this method must return null.

```js
var storage = require('webstorage')();
storage.setItem('foo', 'bar');
storage.key(0); // => 'bar'
storage.key(1); // => null
```

### storage#getItem(key)

Returns the current value associated with the given key. If the given key does not exist in the list associated with the object then this method must return null.

### storage#setItem(key, value)

First, checks if a key/value pair with the given key already exists in the list associated with the object. If it does not, then a new key/value pair is added to the list, with the given key and with its value set to value. If the key does exist in the list, then it has its value updated to value.

### storage#removeItem(key)

Causes the key/value pair with the given key to be removed from the list associated with the object, if it exists. If no item with that key exists,the method does nothing.

### storage#clear()

Causes the list associated with the object to be emptied of all key/value pairs, if there are any. If there are none, then the method does nothing.

## Persistence API

### Persistence

The `Persistence` interface represents the persistent data storage.

### persistent#keys()

Returns all keys stored.

### persistent#getItem(key)

Returns the value associated with the given key.

### persistent#setItem(key, value)

Adds or updates the key/value pair.

### persistent#removeItem(key)

Removes the item with the given key from the persistent storage.

### persistent#clear()

Empty all key/value pairs.

## TODO

- Support empty string key
- Use async API as much as possible

## License

MIT

[W3C Web Storage]: http://www.w3.org/TR/webstorage/
