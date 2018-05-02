# nlcst-affix-emoticon-modifier [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Move initial emoticons into the previous sentence.  Useful because many people
place an emoticon, representing emotion related to the previous sentence, after
a terminal marker.  :unamused:

Implemented by [**retext-emoji**][retext-emoji], but separated for use by
standalone (non-retext) processing.

## Installation

[npm][]:

```bash
npm install nlcst-affix-emoticon-modifier
```

## Usage

```js
var affixEmoticon = require('nlcst-affix-emoticon-modifier');
var emoticon = require('nlcst-emoticon-modifier');
var inspect = require('unist-util-inspect');
var english = require('parse-english')();

english.useFirst('tokenizeSentence', emoticon);
english.useFirst('tokenizeParagraph', affixEmoticon);

console.log(inspect(english.parse('Hey. :) How is it going?')));
```

Yields:

```text
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

Merge affix emoticons into the previous sentence.

##### Parameters

###### `paragraph`

The node to process ([`NLCSTParagraphNode`][paragraph]).

## Contribute

See [`contributing.md` in `syntax-tree/nlcst`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/nlcst-affix-emoticon-modifier.svg

[travis]: https://travis-ci.org/syntax-tree/nlcst-affix-emoticon-modifier

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/nlcst-affix-emoticon-modifier.svg

[codecov]: https://codecov.io/github/syntax-tree/nlcst-affix-emoticon-modifier

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext-emoji]: https://github.com/wooorm/retext-emoji

[paragraph]: https://github.com/syntax-tree/nlcst#paragraph

[contributing]: https://github.com/syntax-tree/nlcst/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/nlcst/blob/master/code-of-conduct.md
