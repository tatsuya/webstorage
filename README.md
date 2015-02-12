# webstorage

Node.js implementation of [W3C Web Storage].

## Installation

```
npm install webstorage
```

## Usage

```js
var Storage = require('webstorage');
var storage = new Storage();

storage.setItem('foo', 'a');
storage.setItem('bar', 'b');
storage.setItem('baz', 'c');

storage.getItem('foo') // => 'a'
storage.getItem('bar') // => 'b'
storage.getItem('baz') // => 'c'
storage.length // => 3

storage.removeItem('foo');
storage.length // => 2

storage.clear();
storage.length // => 0
```
## API

### Storage

Storage constructor. Each Storage object provides access to a list of key/value pairs. Keys are strings. Any string (including the empty string) is a valid key. Values are similarly strings.

```js
var Storage = require('webstorage');
var storage = new Storage();
```

#### storage.length

Returns the number of key/value pairs currently present in the list associated with the object.

#### storage.key(n)

Returns the name of the nth key in the list. The order of keys must be consistent within an object so long as the number of keys doesn't change. If n is greater than or equal to the number of key/value pairs in the object, then this method must return null.

```js
var storage = new Storage();
storage.setItem('foo', 'bar');
storage.setItem('bar', 'baz');
assert.equal(storage.key(0), 'foo');
assert.equal(storage.key(1), 'bar');
assert.equal(storage.key(2), null);
```

#### storage.getItem(key)

Returns the current value associated with the given key. If the given key does not exist in the list associated with the object then this method must return null.

#### storage.setItem(key, value)

First, checks if a key/value pair with the given key already exists in the list associated with the object. If it does not, then a new key/value pair is added to the list, with the given key and with its value set to value. If the key does exist in the list, then it has its value updated to value.

#### storage.removeItem(key)

Causes the key/value pair with the given key to be removed from the listassociated with the object, if it exists. If no item with that key exists,the method does nothing.

#### storage.clear()

Causes the list associated with the object to be emptied of all key/value pairs, if there are any. If there are none, then the method does nothing.

## TODO

- Persist data

[W3C Web Storage]: http://www.w3.org/TR/webstorage/
