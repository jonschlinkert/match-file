/*!
 * match-file <https://github.com/jonschlinkert/match-file>
 *
 * Copyright (c) 2016-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var path = require('path');
var isGlob = require('is-glob');
var endsWith = require('path-ends-with');
var mm = require('micromatch');

function matchFile(name, file) {
  if (typeof name !== 'string') {
    throw new TypeError('expected name to be a string');
  }

  if (!isVinyl(file)) {
    throw new TypeError('expected file to be an object');
  }

  return file.key === name
    || file.path === name
    || file.history[0] === name
    || endsWith(file.history[0], name)
    || endsWith(file.path, name)
    || file.stem === name;
}

matchFile.matcher = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  if (!isGlob(pattern)) {
    return function(file) {
      return matchFile(pattern, file);
    };
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
      || isMatch(path.resolve(file.path))
      || isMatch(file.relative)
      || isMatch(file.basename)
      || isMatch(file.stem);
  };
};

matchFile.isMatch = function(patterns, file, options) {
  return matchFile.matcher(patterns, options)(file);
};

function isVinyl(file) {
  return file && typeof file === 'object' && file._isVinyl === true;
}

/**
 * Expose `matchFile`
 */

module.exports = matchFile;
