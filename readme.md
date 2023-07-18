# nlcst-affix-emoticon-modifier

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[nlcst][] utility to move initial emoticons into the previous sentence.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`affixEmoticonModifier(node)`](#affixemoticonmodifiernode)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This utility searches emoticon nodes (from
[`nlcst-emoticon-modifier`][nlcst-emoticon-modifier] and
[`nlcst-emoji-modifier`][nlcst-emoji-modifier]) that start a sentence and then
moves them into the previous sentence.

## When should I use this?

This package is a tiny utility that helps when dealing with emoticons in natural
language.
It’s useful because many people place an emoticon or emoji, representing emotion
related to the previous sentence, after a terminal marker.
😒

The plugin [`retext-emoji`][retext-emoji] wraps this utility and others at a
higher-level (easier) abstraction.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install nlcst-affix-emoticon-modifier
```

In Deno with [`esm.sh`][esmsh]:

```js
import {affixEmoticonModifier} from 'https://esm.sh/nlcst-affix-emoticon-modifier@3'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {affixEmoticonModifier} from 'https://esm.sh/nlcst-affix-emoticon-modifier@3?bundle'
</script>
```

## Use

```js
import {affixEmoticonModifier} from 'nlcst-affix-emoticon-modifier'
import {emoticonModifier} from 'nlcst-emoticon-modifier'
import {ParseEnglish} from 'parse-english'
import {inspect} from 'unist-util-inspect'

const parser = new ParseEnglish()
parser.tokenizeSentencePlugins.unshift(emoticonModifier)
parser.tokenizeParagraphPlugins.unshift(affixEmoticonModifier)

console.log(inspect(parser.parse('Hey. :) How is it going?')))
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

This package exports the identifier
[`affixEmoticonModifier`][api-affix-emoticon-modifier].
There is no default export.

### `affixEmoticonModifier(node)`

Merge emoticons in `node` into `EmoticonNode`s.

See [`Emoticon` in `nlcst-emoticon-modifier`][emoticon-mofifier-emoticon] for
that type.

###### Parameters

*   `node` ([`Paragraph`][paragraph])
    — nlcst paragraph to transform

###### Returns

Nothing (`undefined`).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

See [`Emoticon` in `nlcst-emoticon-modifier`][emoticon-mofifier-emoticon] for
how to register that type.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line,
`nlcst-affix-emoticon-modifier@^3`, compatible with Node.js 16.

## Related

*   [`nlcst-emoticon-modifier`](https://github.com/syntax-tree/nlcst-emoticon-modifier)
    — support emoticons
*   [`nlcst-emoji-modifier`](https://github.com/syntax-tree/nlcst-emoji-modifier)
    — support emoji and gemoji

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
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

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=nlcst-affix-emoticon-modifier

[size]: https://bundlejs.com/?q=nlcst-affix-emoticon-modifier

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[retext-emoji]: https://github.com/retextjs/retext-emoji

[nlcst]: https://github.com/syntax-tree/nlcst

[paragraph]: https://github.com/syntax-tree/nlcst#paragraph

[nlcst-emoticon-modifier]: https://github.com/syntax-tree/nlcst-emoticon-modifier

[nlcst-emoji-modifier]: https://github.com/syntax-tree/nlcst-emoji-modifier

[emoticon-mofifier-emoticon]: https://github.com/syntax-tree/nlcst-emoticon-modifier#emoticon

[api-affix-emoticon-modifier]: #affixemoticonmodifiernode
