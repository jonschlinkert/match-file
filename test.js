'use strict';

require('mocha');
var assert = require('assert');
var matchFile = require('./');
var File = require('vinyl');
var file;

describe('match-file', function() {
  describe('matchFile', function() {
    beforeEach(function() {
      file = new File({path: 'a/b/c/d/e.txt', base: 'a/b/c'});
      file.key = 'zzz/a.txt'; // arbitrary key (assemble compatibility)
    });

    it('should return true if file.path matches name', function() {
      assert(matchFile('a/b/c/d/e.txt', file));
    });

    it('should return false if file.path does not match name', function() {
      assert(!matchFile('a/b/c/d/foo.txt', file));
    });

    it('should return true if file.relative matches name', function() {
      assert(matchFile('d/e.txt', file));
    });

    it('should return false if file.relative does not match name', function() {
      assert(!matchFile('d/foo.txt', file));
    });

    it('should return true if file.basename matches name', function() {
      assert(matchFile('e.txt', file));
    });

    it('should return false if file.basename does not match name', function() {
      assert(!matchFile('foo.txt', file));
    });

    it('should return true if file.stem matches name', function() {
      assert(matchFile('e', file));
    });

    it('should return false if file.stem does not match name', function() {
      assert(!matchFile('foo', file));
    });

    it('should return true if file.key matches name', function() {
      assert(matchFile('zzz/a.txt', file));
    });

    it('should return false if file.key does not match name', function() {
      assert(!matchFile('zzz/foo.txt', file));
    });
  });

  describe('lib', function() {
    it('should export a function', function() {
      assert.equal(typeof matchFile, 'function');
    });

    it('should throw an error when name is not a string', function(cb) {
      try {
        matchFile();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected a string');
        cb();
      }
    });

    it('should throw an error when file is not an object', function(cb) {
      try {
        matchFile('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected an object');
        cb();
      }
    });
  });
});
