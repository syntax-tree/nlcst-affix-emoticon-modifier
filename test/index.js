/**
 * @typedef {import('nlcst').Root} Root
 */

import fs from 'node:fs'
import path from 'node:path'
import test from 'tape'
import {unified} from 'unified'
import retextEnglish from 'retext-english'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {removePosition} from 'unist-util-remove-position'
import {affixEmoticonModifier} from '../index.js'

/** @type {Root} */
const lollipop = JSON.parse(
  String(fs.readFileSync(path.join('test', 'fixtures', 'lollipop.json')))
)

/** @type {Root} */
const smile = JSON.parse(
  String(fs.readFileSync(path.join('test', 'fixtures', 'smile.json')))
)

test('affixEmoticonModifier()', (t) => {
  t.throws(
    () => {
      // @ts-expect-error runtime.
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

/**
 * Shortcut to access the CST.
 *
 * @param {string} fixture
 * @param {boolean} [positionless=false]
 */
function process(fixture, positionless) {
  const processor = unified().use(retextEnglish).use(plugin).freeze()

  if (positionless && processor.Parser) {
    // Fine.
    // type-coverage:ignore-next-line
    processor.Parser.prototype.position = false
  }

  return processor.runSync(processor.parse(fixture))
}

/**
 * Add modifier to processor.
 *
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[]>}
 */
function plugin() {
  if (this.Parser) {
    // Fine.
    // type-coverage:ignore-next-line
    this.Parser.prototype.useFirst('tokenizeSentence', emojiModifier)
    // Fine.
    // type-coverage:ignore-next-line
    this.Parser.prototype.useFirst('tokenizeSentence', emoticonModifier)
    // Fine.
    // type-coverage:ignore-next-line
    this.Parser.prototype.useFirst('tokenizeParagraph', affixEmoticonModifier)
  }
}
