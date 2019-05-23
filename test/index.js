'use strict'

var test = require('tape')
var unified = require('unified')
var english = require('retext-english')
var emojiModifier = require('nlcst-emoji-modifier')
var emoticonModifier = require('nlcst-emoticon-modifier')
var remove = require('unist-util-remove-position')
var modifier = require('..')

var lollipop = require('./fixtures/lollipop')
var smile = require('./fixtures/smile')

test('nlcst-affix-emoticon-modifier()', function(t) {
  t.throws(
    function() {
      modifier({})
    },
    /Missing children in `parent`/,
    'should throw when not given a parent'
  )

  t.deepEqual(
    process('Lol! :lollipop: That’s cool.'),
    lollipop,
    'should merge at sentence-start (1)'
  )

  t.deepEqual(
    process('Lol! :lollipop: That’s cool.', true),
    remove(lollipop, true),
    'should merge at sentence-start (1, positionless)'
  )

  t.deepEqual(
    process('Lol! :) That’s cool.'),
    smile,
    'should merge at sentence-start (2)'
  )

  t.deepEqual(
    process('Lol! :) That’s cool.', true),
    remove(smile, true),
    'should merge at sentence-start (2, positionless)'
  )

  t.end()
})

// Short-cut to access the CST.
function process(fixture, positionless) {
  var processor = unified()
    .use(english)
    .use(plugin)
    .freeze()

  if (positionless) {
    processor.Parser.prototype.position = false
  }

  return processor.runSync(processor.parse(fixture))
}

// Add modifier to processor.
function plugin() {
  this.Parser.prototype.useFirst('tokenizeSentence', emojiModifier)
  this.Parser.prototype.useFirst('tokenizeSentence', emoticonModifier)
  this.Parser.prototype.useFirst('tokenizeParagraph', modifier)
}
