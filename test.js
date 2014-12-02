'use strict';

/**
 * Dependencies.
 */

var affixEmoticonModifier,
    emojiModifier,
    emoticonModifier,
    ParseEnglish,
    assert;

affixEmoticonModifier = require('./');
emojiModifier = require('nlcst-emoji-modifier');
emoticonModifier = require('nlcst-emoticon-modifier');
ParseEnglish = require('parse-english');
assert = require('assert');

/**
 * `ParseEnglish`.
 */

var parseEnglish;

parseEnglish = new ParseEnglish();

emoticonModifier(parseEnglish);
emojiModifier(parseEnglish);
affixEmoticonModifier(parseEnglish);

/**
 * Tests.
 */

describe('nlcst-emoji-modifier()', function () {
    it('should be a `function`', function () {
        assert(typeof affixEmoticonModifier === 'function');
    });

    it('should throw when not given a parser', function () {
        assert.throws(function () {
            affixEmoticonModifier({});
        }, /not a valid parser/);

        assert.doesNotThrow(function () {
            affixEmoticonModifier(new ParseEnglish());
        });
    });

    it('should merge `EmoticonNode`s at sentence start into the previous ' +
        'sentence',
        function () {
            var tree;

            tree = parseEnglish.parse('Lol! :lollipop: That\'s cool.');

            assert(
                JSON.stringify(tree.children[0].children) ===
                JSON.stringify([
                    {
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'Lol'
                                    }
                                ]
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '!'
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'EmoticonNode',
                                'value': ':lollipop:'
                            }
                        ]
                    },
                    {
                        'type': 'WhiteSpaceNode',
                        'value': ' '
                    },
                    {
                        'type': 'SentenceNode',
                        'children': [
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'That'
                                    },
                                    {
                                        'type': 'PunctuationNode',
                                        'value': '\''
                                    },
                                    {
                                        'type': 'TextNode',
                                        'value': 's'
                                    }
                                ]
                            },
                            {
                                'type': 'WhiteSpaceNode',
                                'value': ' '
                            },
                            {
                                'type': 'WordNode',
                                'children': [
                                    {
                                        'type': 'TextNode',
                                        'value': 'cool'
                                    }
                                ]
                            },
                            {
                                'type': 'PunctuationNode',
                                'value': '.'
                            }
                        ]
                    }
                ])
            );
        }
    );
});
