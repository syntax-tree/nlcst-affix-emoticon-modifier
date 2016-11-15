'use strict';

/* eslint-env mocha */

/* Dependencies. */
var assert = require('assert');
var unified = require('unified');
var english = require('retext-english');
var emojiModifier = require('nlcst-emoji-modifier');
var emoticonModifier = require('nlcst-emoticon-modifier');
var remove = require('unist-util-remove-position');
var modifier = require('..');

/* Fixtures. */
var lollipop = require('./fixtures/lollipop');
var smile = require('./fixtures/smile');

/* Short-cut to access the CST. */
function process(fixture, positionless) {
  var processor = unified().use(english).use(plugin);
  return processor.run(processor.parse(fixture, {position: !positionless}));
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

  it('should work', function () {
    assert.deepEqual(process('Lol! :lollipop: That’s cool.'), lollipop, 'a1');
    assert.deepEqual(process('Lol! :lollipop: That’s cool.', true), remove(lollipop, true), 'a2');

    assert.deepEqual(process('Lol! :) That’s cool.'), smile, 'b1');
    assert.deepEqual(process('Lol! :) That’s cool.', true), remove(smile, true), 'b2');
  });
});

/**
 * Add modifier to processor.
 */
function plugin(processor) {
  processor.Parser.prototype.useFirst('tokenizeSentence', emojiModifier);
  processor.Parser.prototype.useFirst('tokenizeSentence', emoticonModifier);
  processor.Parser.prototype.useFirst('tokenizeParagraph', modifier);
}
