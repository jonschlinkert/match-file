/*!
 * match-file <https://github.com/jonschlinkert/match-file>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isObject = require('isobject');
var parse = require('parse-filepath');
var mm = require('micromatch');
var path = require('path');

function matchFile(name, file) {
  if (typeof name !== 'string') {
    throw new TypeError('expected name to be a string');
  }
  if (!isObject(file) || file._isVinyl !== true) {
    throw new TypeError('expected file to be an object');
  }

  return (name === file.key)
    || (name === file.history[0])
    || (name === file.path)
    || (name === file.relative)
    || (name === file.basename)
    || (name === file.stem)
    || (path.resolve(file.path) === path.resolve(name))
    || matchOrig(name, file);
}

function matchOrig(name, file) {
  var orig = parse(file.history[0]);
  return (name === orig.path)
    || (name === orig.relative)
    || (name === orig.basename)
    || (name === orig.stem);
}

matchFile.matcher = function(pattern, options) {
  if (typeof pattern !== 'string' && !Array.isArray(pattern)) {
    throw new TypeError('expected pattern to be a string or array');
  }

  var isMatch = mm.matcher(pattern, options);
  return function(file) {
    if (typeof file === 'string') {
      return isMatch(file);
    }

    return matchFile(pattern, file)
      || isMatch(file.key)
      || isMatch(file.history[0])
      || isMatch(file.path)
      || isMatch(file.relative)
      || isMatch(file.basename)
      || isMatch(file.stem)
      || isMatch(path.resolve(file.path));
  };
};

matchFile.isMatch = function(patterns, file, options) {
  return matchFile.matcher(patterns, options)(file);
};

/**
 * Expose `matchFile`
 */

module.exports = matchFile;
