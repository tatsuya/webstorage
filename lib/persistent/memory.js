'use strict';

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
  this[key] = String(value);
};

MemoryStorage.prototype.removeItem = function(key) {
  delete this[key];
};

module.exports = MemoryStorage;