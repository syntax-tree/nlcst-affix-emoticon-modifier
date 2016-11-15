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

###### Parameters

*   `paragraph` ([`NLCSTParagraphNode`](https://github.com/wooorm/nlcst#paragraphnode)).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/nlcst-affix-emoticon-modifier.svg

[travis]: https://travis-ci.org/wooorm/nlcst-affix-emoticon-modifier

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/nlcst-affix-emoticon-modifier.svg

[codecov]: https://codecov.io/github/wooorm/nlcst-affix-emoticon-modifier

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext-emoji]: https://github.com/wooorm/retext-emoji
