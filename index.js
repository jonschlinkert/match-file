/*!
 * match-file <https://github.com/jonschlinkert/match-file>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var path = require('path');

module.exports = function matchFile(name, file) {
  if (typeof name !== 'string') {
    throw new TypeError('expected a string');
  }
  if (!isObject(file)) {
    throw new TypeError('expected an object');
  }

  return (name === file.key)
    || (name === file.path)
    || (name === file.relative)
    || (name === file.basename)
    || (name === file.stem)
    || (path.resolve(file.path) === path.resolve(name));
};

function isObject(val) {
  return val && typeof val === 'object';
}
