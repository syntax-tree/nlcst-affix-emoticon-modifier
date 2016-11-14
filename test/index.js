'use strict';

/* eslint-env mocha */

/* Dependencies. */
var assert = require('assert');
var retext = require('retext');
var english = require('retext-english');
var emojiModifier = require('nlcst-emoji-modifier');
var emoticonModifier = require('nlcst-emoticon-modifier');
var modifier = require('..');

/* Methods. */
var dequal = assert.deepEqual;

/* Fixtures. */
var lollipop = require('./fixtures/lollipop');
var smile = require('./fixtures/smile');

/* Processors. */
var position = retext(english).use(plugin);
var noPosition = retext(english).use(plugin).use(function (instance) {
  instance.Parser.prototype.position = false;
});

/* Short-cut to access the CST. */
function process(fixture, processor) {
  var cst;

  processor.process(fixture, function (err, file) {
    /* istanbul ignore next */
    if (err) {
      throw err;
    }

    cst = file.namespace('retext').cst;
  });

  return cst;
}

/*
 * Tests.
 */

describe('nlcst-affix-emoticon-modifier()', function () {
  it('should throw when not given a parent', function () {
    assert.throws(
      function () {
        modifier({});
      },
      /Missing children in `parent`/
    );
  });

  it('should merge at sentence-start', function () {
    check('Lol! :lollipop: That’s cool.', lollipop);
    check('Lol! :) That’s cool.', smile);
  });
});

/**
 * Short-cut to access the CST.
 */
function check(fixture, node) {
  dequal(process(fixture, position), node);
  dequal(process(fixture, noPosition), clean(node));
}

/**
 * Add modifier to processor.
 */
function plugin(processor) {
  processor.Parser.prototype.useFirst('tokenizeSentence', emojiModifier);
  processor.Parser.prototype.useFirst('tokenizeSentence', emoticonModifier);
  processor.Parser.prototype.useFirst('tokenizeParagraph', modifier);
}

/* Clone `object` but omit positional information. */
function clean(object) {
  var clone = 'length' in object ? [] : {};
  var key;
  var value;

  for (key in object) {
    value = object[key];

    if (key === 'position') {
      continue;
    }

    clone[key] = typeof object[key] === 'object' ? clean(value) : value;
  }

  return clone;
}
