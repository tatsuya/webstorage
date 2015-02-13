'use strict';

var mkdirp = require('mkdirp');
var fs = require('fs');
var join = require('path').join;

/**
 * Persistent local file storage
 *
 * @constructor
 */
function LocalPersistent(path) {
  if (!(this instanceof LocalPersistent)) {
    return new LocalPersistent(path);
  }
  mkdirp.sync(path);
  this.path = path;
}

/**
 * Returns all keys stored.
 *
 * @return {String[]} keys
 */
LocalPersistent.prototype.keys = function() {
  var self = this;
  return fs.readdirSync(self.path).map(function(filename) {
    return decode(filename);
  });
};

/**
 * Returns the value associated with the given key.
 *
 * @param  {String} key
 * @return {String} value
 */
LocalPersistent.prototype.getItem = function(key) {
  return fs.readFileSync(join(this.path, encode(key)), 'utf8');
};

/**
 * Adds or updates the key/value pair.
 *
 * @param {String} key
 * @param {String} value
 */
LocalPersistent.prototype.setItem = function(key, value) {
  fs.writeFileSync(join(this.path, encode(key)), value);
};

/**
 * Removes the item with the given key from the persistent storage.
 *
 * @param  {String} key
 */
LocalPersistent.prototype.removeItem = function(key) {
  var filepath = join(this.path, encode(key));
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

/**
 * Empty all key/value pairs.
 */
LocalPersistent.prototype.clear = function() {
  var self = this;
  fs.readdirSync(self.path).forEach(function(filename) {
    var filepath = join(self.path, filename);
    fs.unlinkSync(filepath);
  });
};

/**
 * Returns a base64 encoded string.
 *
 * @param  {String} str
 * @return {String}
 */
function encode(str) {
  return new Buffer(str).toString('base64');
}

/**
 * Decode base64 encoded string.
 *
 * @param  {String} str
 * @return {String}
 */
function decode(str) {
  return new Buffer(str, 'base64').toString('utf8');
}

module.exports = LocalPersistent;