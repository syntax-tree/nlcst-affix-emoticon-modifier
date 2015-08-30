# nlcst-affix-emoticon-modifier [![Build Status](https://img.shields.io/travis/wooorm/nlcst-affix-emoticon-modifier.svg)](https://travis-ci.org/wooorm/nlcst-affix-emoticon-modifier) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/nlcst-affix-emoticon-modifier.svg)](https://codecov.io/github/wooorm/nlcst-affix-emoticon-modifier)

Merge affix emoticons into the previous sentence in NLCST.

Implemented by [retext-emoji](https://github.com/wooorm/retext-emoji), but
separated for use by standalone (non-[retext](https://github.com/wooorm/retext))
processing.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install nlcst-affix-emoticon-modifier
```

**nlcst-affix-emoticon-modifier** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](nlcst-affix-emoticon-modifier.js) and [compressed](nlcst-affix-emoticon-modifier.min.js).

## Usage

```javascript
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

### affixEmoticonModifier(paragraph)

Merge affix emoticons into the previous sentence.

**Parameters**

*   `paragraph` ([`NLCSTParagraphNode`](https://github.com/wooorm/nlcst#paragraphnode)).

**Throws**

*   `Error` — When not given a parent node.

## Related

*   [nlcst](https://github.com/wooorm/nlcst);
*   [nlcst-emoji-modifier](https://github.com/wooorm/nlcst-emoji-modifier);
*   [nlcst-emoticon-modifier](https://github.com/wooorm/nlcst-emoticon-modifier);
*   [retext](https://github.com/wooorm/retext).

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
