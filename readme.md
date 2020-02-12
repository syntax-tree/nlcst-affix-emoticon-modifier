# nlcst-affix-emoticon-modifier

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**nlcst**][nlcst] utility to move initial emoticons into the previous sentence.
Useful because many people place an emoticon, representing emotion related to
the previous sentence, after a terminal marker.  :unamused:

> **Note**: You probably want to use [retext-emoji][].

## Install

[npm][]:

```sh
npm install nlcst-affix-emoticon-modifier
```

## Use

```js
var affixEmoticon = require('nlcst-affix-emoticon-modifier')
var emoticon = require('nlcst-emoticon-modifier')
var inspect = require('unist-util-inspect')
var english = require('parse-english')()

english.useFirst('tokenizeSentence', emoticon)
english.useFirst('tokenizeParagraph', affixEmoticon)

console.log(inspect(english.parse('Hey. :) How is it going?')))
```

Yields:

```txt
RootNode[1]
└─ ParagraphNode[3]
   ├─ SentenceNode[4]
   │  ├─ WordNode[1]
   │  │  └─ TextNode: 'Hey'
   │  ├─ PunctuationNode: '.'
   │  ├─ WhiteSpaceNode: ' '
   │  └─ EmoticonNode: ':)'
   ├─ WhiteSpaceNode: ' '
   └─ SentenceNode[8]
      ├─ WordNode[1]
      │  └─ TextNode: 'How'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1]
      │  └─ TextNode: 'is'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1]
      │  └─ TextNode: 'it'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1]
      │  └─ TextNode: 'going'
      └─ PunctuationNode: '?'
```

## API

### `affixEmoticon(paragraph)`

Merge affix emoticons (`EmoticonNode`) into the previous sentence.

##### Parameters

###### `paragraph`

The node to process ([`Paragraph`][paragraph]).

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/nlcst-affix-emoticon-modifier.svg

[build]: https://travis-ci.org/syntax-tree/nlcst-affix-emoticon-modifier

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/nlcst-affix-emoticon-modifier.svg

[coverage]: https://codecov.io/github/syntax-tree/nlcst-affix-emoticon-modifier

[downloads-badge]: https://img.shields.io/npm/dm/nlcst-affix-emoticon-modifier.svg

[downloads]: https://www.npmjs.com/package/nlcst-affix-emoticon-modifier

[size-badge]: https://img.shields.io/bundlephobia/minzip/nlcst-affix-emoticon-modifier.svg

[size]: https://bundlephobia.com/result?p=nlcst-affix-emoticon-modifier

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[retext-emoji]: https://github.com/retextjs/retext-emoji

[nlcst]: https://github.com/syntax-tree/nlcst

[paragraph]: https://github.com/syntax-tree/nlcst#paragraph
