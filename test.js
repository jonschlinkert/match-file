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

  describe('.isMatch', function() {
    beforeEach(function() {
      file = new File({path: 'a/b/c/d/e.txt', base: 'a/b/c'});
      file.key = 'zzz/a.txt'; // arbitrary key (assemble compatibility)
    });

    it('should return true if file.path matches name', function() {
      assert(matchFile.isMatch('a/b/c/d/e.txt', file));
    });

    it('should return true if a glob pattern matches `file.path`', function() {
      assert(matchFile.isMatch('**/*.txt', file));
    });

    it('should return true if a glob pattern matches `file.relative`', function() {
      assert(matchFile.isMatch('d/*.txt', file));
    });

    it('should return true if a glob pattern matches `file.stem`', function() {
      assert(matchFile.isMatch('*', file));
    });

    it('should return true if a glob pattern matches `file.basename`', function() {
      assert(matchFile.isMatch('*.txt', file));
    });

    it('should return false if file.path does not match name', function() {
      assert(!matchFile.isMatch('a/b/c/d/foo.txt', file));
    });

    it('should return true if file.relative matches name', function() {
      assert(matchFile.isMatch('d/e.txt', file));
    });

    it('should return false if file.relative does not match name', function() {
      assert(!matchFile.isMatch('d/foo.txt', file));
    });

    it('should return true if file.basename matches name', function() {
      assert(matchFile.isMatch('e.txt', file));
    });

    it('should return false if file.basename does not match name', function() {
      assert(!matchFile.isMatch('foo.txt', file));
    });

    it('should return true if file.stem matches name', function() {
      assert(matchFile.isMatch('e', file));
    });

    it('should return false if file.stem does not match name', function() {
      assert(!matchFile.isMatch('foo', file));
    });

    it('should return true if file.key matches name', function() {
      assert(matchFile.isMatch('zzz/a.txt', file));
    });

    it('should return false if file.key does not match name', function() {
      assert(!matchFile.isMatch('zzz/foo.txt', file));
    });
  });

  describe('.matcher', function() {
    beforeEach(function() {
      file = new File({path: 'a/b/c/d/e.txt', base: 'a/b/c'});
      file.key = 'zzz/a.txt'; // arbitrary key (assemble compatibility)
    });

    it('should return a matcher function', function() {
      var isMatch = matchFile.matcher('**/*.txt');
      assert.equal(typeof isMatch, 'function');
    });

    it('should return true if file.path matches a file', function() {
      var isMatch = matchFile.matcher('**/*.txt');
      assert(isMatch(file));
    });

    it('should return false if file.path does not match a file', function() {
      var isMatch = matchFile.matcher('**/*.js');
      assert(!isMatch(file));
    });

    it('should return true if file.relative matches the pattern', function() {
      var isMatch = matchFile.matcher('d/e.txt');
      assert(isMatch(file));
    });

    it('should return false if file.relative does not match name', function() {
      var isMatch = matchFile.matcher('d/foo.txt');
      assert(!isMatch(file));
    });

    it('should return true if file.basename matches name', function() {
      var isMatch = matchFile.matcher('e.txt');
      assert(isMatch(file));
    });

    it('should return false if file.basename does not match name', function() {
      var isMatch = matchFile.matcher('foo.txt');
      assert(!isMatch(file));
    });

    it('should return true if file.stem matches name', function() {
      var isMatch = matchFile.matcher('e');
      assert(isMatch(file));
    });

    it('should return false if file.stem does not match name', function() {
      var isMatch = matchFile.matcher('foo');
      assert(!isMatch(file));
    });

    it('should return true if file.key matches name', function() {
      var isMatch = matchFile.matcher('zzz/a.txt');
      assert(isMatch(file));
    });

    it('should return false if file.key does not match name', function() {
      var isMatch = matchFile.matcher('zzz/foo.txt');
      assert(!isMatch(file));
    });
  });

  describe('module', function() {
    it('should export a function', function() {
      assert.equal(typeof matchFile, 'function');
    });

    it('should throw an error when name is not a string', function(cb) {
      try {
        matchFile();
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected name to be a string');
        cb();
      }
    });

    it('should throw an error when file is not an object', function(cb) {
      try {
        matchFile('foo');
        cb(new Error('expected an error'));
      } catch (err) {
        assert(err);
        assert.equal(err.message, 'expected file to be an object');
        cb();
      }
    });
  });
});
