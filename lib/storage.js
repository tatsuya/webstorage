'use strict';

var memory = require('./persistent/memory');

/**
 * Storage constructor. Each Storage object provides access to a list of
 * key/value pairs. Keys are strings. Any string (including the empty string) is
 * a valid key. Values are similarly strings.
 *
 * @constructor
 */
function Storage(persistent) {
  if (!(this instanceof Storage)) {
    return new Storage(persistent);
  }

  persistent = persistent || memory();

  Object.defineProperty(this, 'persistent', {
    value: persistent
  });

  var self = this;
  self.persistent.keys().forEach(function(key) {
    self[key] = self.persistent.getItem(key);
  });
}

/**
 * Returns the number of key/value pairs currently present in the list
 * associated with the object.
 *
 * @return {Number} length
 */
Storage.prototype.__defineGetter__('length', function() {
  return Object.keys(this).length;
});

/**
 * Returns the name of the nth key in the list. The order of keys must be
 * consistent within an object so long as the number of keys doesn't change.
 *
 * If n is greater than or equal to the number of key/value pairs in the object,
 * then this method must return null.
 *
 * @param  {Number} n
 * @return {String} key
 */
Storage.prototype.key = function(n) {
  if (arguments.length < 1) {
    throw new TypeError('Failed to execute \'key\' on \'Storage\': 1 argument required, but only ' + arguments.length + ' present.');
  }
  n = parseInt(n, 10);
  var key = Object.keys(this)[n];
  if (key === undefined) {
    return null;
  }
  return key;
};

/**
 * Returns the current value associated with the given key. If the given key
 * does not exist in the list associated with the object then this method must
 * return null.
 *
 * @param  {String} key
 * @return {String} value
 */
Storage.prototype.getItem = function(key) {
  if (this.hasOwnProperty(key)) {
    return String(this[key]);
  }
  return null;
};

/**
 * First, checks if a key/value pair with the given key already exists in the
 * list associated with the object.
 *
 * If it does not, then a new key/value pair is added to the list, with the
 * given key and with its value set to value.
 *
 * If the key does exist in the list, then it has its value updated to
 * value.
 *
 * @param {String} key
 * @param {String} value
 */
Storage.prototype.setItem = function(key, value) {
  key = String(key);
  value = String(value);
  this.persistent.setItem(key, value);
  this[key] = value;
};

/**
 * Causes the key/value pair with the given key to be removed from the list
 * associated with the object, if it exists. If no item with that key exists,
 * the method does nothing.
 *
 * @param {String} key
 */
Storage.prototype.removeItem = function(key) {
  this.persistent.removeItem(key);
  delete this[key];
};

/**
 * Causes the list associated with the object to be emptied of all key/value
 * pairs, if there are any. If there are none, then the method does nothing.
 */
Storage.prototype.clear = function() {
  Object.keys(this).forEach(this.removeItem, this);
};

module.exports = Storage;
