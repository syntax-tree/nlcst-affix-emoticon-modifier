import fs from 'fs'
import path from 'path'
import test from 'tape'
import unified from 'unified'
import english from 'retext-english'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {removePosition} from 'unist-util-remove-position'
import {affixEmoticonModifier} from '../index.js'

var lollipop = JSON.parse(
  String(fs.readFileSync(path.join('test', 'fixtures', 'lollipop.json')))
)

var smile = JSON.parse(
  String(fs.readFileSync(path.join('test', 'fixtures', 'smile.json')))
)

test('affixEmoticonModifier()', function (t) {
  t.throws(
    function () {
      affixEmoticonModifier({})
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
    removePosition(lollipop, true),
    'should merge at sentence-start (1, positionless)'
  )

  t.deepEqual(
    process('Lol! :) That’s cool.'),
    smile,
    'should merge at sentence-start (2)'
  )

  t.deepEqual(
    process('Lol! :) That’s cool.', true),
    removePosition(smile, true),
    'should merge at sentence-start (2, positionless)'
  )

  t.end()
})

// Short-cut to access the CST.
function process(fixture, positionless) {
  var processor = unified().use(english).use(plugin).freeze()

  if (positionless) {
    processor.Parser.prototype.position = false
  }

  return processor.runSync(processor.parse(fixture))
}

// Add modifier to processor.
function plugin() {
  this.Parser.prototype.useFirst('tokenizeSentence', emojiModifier)
  this.Parser.prototype.useFirst('tokenizeSentence', emoticonModifier)
  this.Parser.prototype.useFirst('tokenizeParagraph', affixEmoticonModifier)
}
