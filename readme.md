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

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install nlcst-affix-emoticon-modifier
```

## Use

```js
import {affixEmoticonModifier} from 'nlcst-affix-emoticon-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {inspect} from 'unist-util-inspect'
import {ParseEnglish} from 'parse-english'

var english = new ParseEnglish()

english.useFirst('tokenizeSentence', emoticonModifier)
english.useFirst('tokenizeParagraph', affixEmoticonModifier)

console.log(inspect(english.parse('Hey. :) How is it going?')))
```

Yields:

```txt
RootNode[1] (1:1-1:25, 0-24)
└─0 ParagraphNode[3] (1:1-1:25, 0-24)
    ├─0 SentenceNode[4] (1:1-1:8, 0-7)
    │   ├─0 WordNode[1] (1:1-1:4, 0-3)
    │   │   └─0 TextNode "Hey" (1:1-1:4, 0-3)
    │   ├─1 PunctuationNode "." (1:4-1:5, 3-4)
    │   ├─2 WhiteSpaceNode " " (1:5-1:6, 4-5)
    │   └─3 EmoticonNode ":)" (1:6-1:8, 5-7)
    ├─1 WhiteSpaceNode " " (1:8-1:9, 7-8)
    └─2 SentenceNode[8] (1:9-1:25, 8-24)
        ├─0 WordNode[1] (1:9-1:12, 8-11)
        │   └─0 TextNode "How" (1:9-1:12, 8-11)
        ├─1 WhiteSpaceNode " " (1:12-1:13, 11-12)
        ├─2 WordNode[1] (1:13-1:15, 12-14)
        │   └─0 TextNode "is" (1:13-1:15, 12-14)
        ├─3 WhiteSpaceNode " " (1:15-1:16, 14-15)
        ├─4 WordNode[1] (1:16-1:18, 15-17)
        │   └─0 TextNode "it" (1:16-1:18, 15-17)
        ├─5 WhiteSpaceNode " " (1:18-1:19, 17-18)
        ├─6 WordNode[1] (1:19-1:24, 18-23)
        │   └─0 TextNode "going" (1:19-1:24, 18-23)
        └─7 PunctuationNode "?" (1:24-1:25, 23-24)
```

## API

This package exports the following identifiers: `affixEmoticonModifier`.
There is no default export.

### `affixEmoticonModifier(paragraph)`

Merge affix emoticons (`EmoticonNode`) into the previous sentence.

##### Parameters

###### `paragraph`

The node to process ([`Paragraph`][paragraph]).

## Related

*   [`nlcst-emoticon-modifier`](https://github.com/syntax-tree/nlcst-emoticon-modifier)
    — Support emoticons
*   [`nlcst-emoji-modifier`](https://github.com/syntax-tree/nlcst-emoji-modifier)
    — Support emoji

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

[build-badge]: https://github.com/syntax-tree/nlcst-affix-emoticon-modifier/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/nlcst-affix-emoticon-modifier/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/nlcst-affix-emoticon-modifier.svg

[coverage]: https://codecov.io/github/syntax-tree/nlcst-affix-emoticon-modifier

[downloads-badge]: https://img.shields.io/npm/dm/nlcst-affix-emoticon-modifier.svg

[downloads]: https://www.npmjs.com/package/nlcst-affix-emoticon-modifier

[size-badge]: https://img.shields.io/bundlephobia/minzip/nlcst-affix-emoticon-modifier.svg

[size]: https://bundlephobia.com/result?p=nlcst-affix-emoticon-modifier

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[retext-emoji]: https://github.com/retextjs/retext-emoji

[nlcst]: https://github.com/syntax-tree/nlcst

[paragraph]: https://github.com/syntax-tree/nlcst#paragraph
