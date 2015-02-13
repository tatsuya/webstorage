'use strict';

var assert = require('assert');
var webstorage = require('..');

describe('index', function() {

  describe('length', function() {
    it('should return the number of key/value pairs', function() {
      var storage = webstorage();
      assert.equal(storage.length, 0);
      storage.setItem('foo', 'bar');
      assert.equal(storage.length, 1);
    });
  });

  describe('key', function() {
    it('should return the name of the nth key in the list', function() {
      var storage = webstorage();
      storage.setItem('foo', 'bar');
      storage.setItem('bar', 'baz');
      assert.equal(storage.key(0), 'foo');
      assert.equal(storage.key(1), 'bar');
      assert.equal(storage.key(2), null);
      assert.equal(storage.key(null), null);
      assert.equal(storage.key(undefined), null);
    });

    it('should throw TypeError if argument is empty', function() {
      var storage = webstorage();
      assert.throws(storage.key, TypeError);
    });
  });

  describe('getItem', function() {
    it('should return the current value associated with the given key', function() {
      var storage = webstorage();
      storage.setItem('foo', 'bar');
      assert.equal(storage.getItem('foo'), 'bar');
    });
  });

  describe('setItem', function() {
    it('should add new key/value pair', function() {
      var storage = webstorage();
      assert.equal(Object.keys(storage).length, 0);
      storage.setItem('foo', 'bar');
      assert.equal(Object.keys(storage).length, 1);
    });

    it('should update the new key/value pair', function() {
      var storage = webstorage();
      assert.equal(Object.keys(storage).length, 0);
      storage.setItem('foo', 'bar');
      assert.equal(Object.keys(storage).length, 1);
      assert.equal(storage.getItem('foo'), 'bar');
      storage.setItem('foo', 'baz');
      assert.equal(Object.keys(storage).length, 1);
      assert.equal(storage.getItem('foo'), 'baz');
    });

    it('should permit to use an empty string as a key', function() {
      var storage = webstorage();
      assert.equal(Object.keys(storage).length, 0);
      storage.setItem('', '');
      assert.equal(Object.keys(storage).length, 1);
      assert.equal(storage.getItem(''), '');
    });
  });

  describe('removeItem', function() {
    it('should remove the key/value pair with the given key', function() {
      var storage = webstorage();
      storage.setItem('foo', 'bar');
      assert.equal(Object.keys(storage).length, 1);
      assert.equal(storage.getItem('foo'), 'bar');
      storage.removeItem('foo', 'baz');
      assert.equal(Object.keys(storage).length, 0);
      assert.equal(storage.getItem('foo'), null);
    });
  });

  describe('clear', function() {
    it('should empty all key/value pairs', function() {
      var storage = webstorage();
      storage.setItem('foo', 'bar');
      storage.setItem('bar', 'baz');
      assert.equal(Object.keys(storage).length, 2);
      storage.clear();
      assert.equal(Object.keys(storage).length, 0);
    });
  });

});