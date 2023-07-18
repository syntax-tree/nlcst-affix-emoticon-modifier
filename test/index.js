/**
 * @typedef {import('nlcst').Root} Root
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {ParseEnglish} from 'parse-english'
import {affixEmoticonModifier} from '../index.js'

const parser = new ParseEnglish()

parser.tokenizeSentencePlugins.unshift(emojiModifier)
parser.tokenizeSentencePlugins.unshift(emoticonModifier)
parser.tokenizeParagraphPlugins.unshift(affixEmoticonModifier)

/** @type {Root} */
const lollipop = JSON.parse(
  String(await fs.readFile(new URL('fixtures/lollipop.json', import.meta.url)))
)

/** @type {Root} */
const smile = JSON.parse(
  String(await fs.readFile(new URL('fixtures/smile.json', import.meta.url)))
)

test('affixEmoticonModifier', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('../index.js')).sort(), [
      'affixEmoticonModifier'
    ])
  })

  await t.test('should throw when not given a parent', async function () {
    assert.throws(function () {
      // @ts-expect-error: check how a non-parent is handled at runtime.
      affixEmoticonModifier({type: 'TextNode', value: 'alpha'})
    }, /Missing children in `parent`/)
  })

  await t.test('should merge at sentence-start (1)', async function () {
    assert.deepEqual(parser.parse('Lol! :lollipop: That’s cool.'), lollipop)
  })

  await t.test('should merge at sentence-start (2)', async function () {
    assert.deepEqual(parser.parse('Lol! :) That’s cool.'), smile)
  })
})
