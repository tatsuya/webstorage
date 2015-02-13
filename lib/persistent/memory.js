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