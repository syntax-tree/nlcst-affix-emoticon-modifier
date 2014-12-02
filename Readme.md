# nlcst-affix-emoticon-modifier [![Build Status](https://img.shields.io/travis/wooorm/nlcst-affix-emoticon-modifier.svg?style=flat)](https://travis-ci.org/wooorm/nlcst-affix-emoticon-modifier) [![Coverage Status](https://img.shields.io/coveralls/wooorm/nlcst-affix-emoticon-modifier.svg?style=flat)](https://coveralls.io/r/wooorm/nlcst-affix-emoticon-modifier?branch=master)

Move initial emoticons into the previous sentence. Useful because many people place an emoticon, representing emotion related to the previous sentence, after a terminal marker. :unamused:

Implemented by [retext-emoji](https://github.com/wooorm/retext-emoji), but separated for use by standalone (non-[retext](https://github.com/wooorm/retext)) parsers.

> Note: this project is useful in combination with natural language parsers like [parse-latin](https://github.com/wooorm/parse-latin), [parse-dutch](https://github.com/wooorm/parse-dutch), and [parse-english](https://github.com/wooorm/parse-english).

## Installation

npm:
```sh
$ npm install nlcst-affix-emoticon-modifier
```

Component:
```sh
$ component install wooorm/nlcst-affix-emoticon-modifier
```

Bower:
```sh
$ bower install nlcst-affix-emoticon-modifier
```

## Usage

```js
var mergeEmoji = require('nlcst-emoji-modifier');
var mergeEmoticon = require('nlcst-emoticon-modifier');
var modifier = require('nlcst-affix-emoticon-modifier');
var ParseEnglish = require('parse-english');
var english = new ParseEnglish();

/* Attach the modifiers. */
mergeEmoji(english);
mergeEmoticon(english);
modifier(english);

english.parse('Who doesn’t like emoticons? <3 You? 💩').children[0].children;
```

Yields:

```json
[
  {
    "type": "SentenceNode",
    "children": [
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "Who"
          }
        ]
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "doesn"
          },
          {
            "type": "PunctuationNode",
            "value": "’"
          },
          {
            "type": "TextNode",
            "value": "t"
          }
        ]
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "like"
          }
        ]
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "emoticons"
          }
        ]
      },
      {
        "type": "PunctuationNode",
        "value": "?"
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "EmoticonNode",
        "value": "<3"
      }
    ]
  },
  {
    "type": "WhiteSpaceNode",
    "value": " "
  },
  {
    "type": "SentenceNode",
    "children": [
      {
        "type": "WordNode",
        "children": [
          {
            "type": "TextNode",
            "value": "You"
          }
        ]
      },
      {
        "type": "PunctuationNode",
        "value": "?"
      },
      {
        "type": "WhiteSpaceNode",
        "value": " "
      },
      {
        "type": "EmoticonNode",
        "value": "💩"
      }
    ]
  }
]
```

## Related

- [nlcst](https://github.com/wooorm/nlcst)
- [nlcst-emoji-modifier](https://github.com/wooorm/nlcst-emoji-modifier)
- [nlcst-emoticon-modifier](https://github.com/wooorm/nlcst-emoticon-modifier)
- [parse-latin](https://github.com/wooorm/parse-latin)
- [parse-dutch](https://github.com/wooorm/parse-dutch)
- [parse-english](https://github.com/wooorm/parse-english)
- [retext](https://github.com/wooorm/retext)

## License

MIT © [Titus Wormer](http://wooorm.com)
