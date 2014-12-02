'use strict';

/**
 * Constant: node types.
 */

var EMOTICON_NODE;

EMOTICON_NODE = 'EmoticonNode';

/**
 * Move emoticons following a terminal marker (thus in
 * the next sentence) to the previous sentence.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */

function mergeAffixEmoji(child, index, parent) {
    var children,
        prev,
        position,
        node;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== 0
    ) {
        position = -1;

        while (children[++position]) {
            node = children[position];

            if (node.type === EMOTICON_NODE) {
                prev = parent.children[index - 1];

                prev.children = prev.children.concat(
                    children.slice(0, position + 1)
                );

                child.children = children.slice(position + 1);

                /**
                 * Next, iterate over the node again.
                 */

                return index;
            } else if (node.type !== 'WhiteSpaceNode') {
                break;
            }
        }
    }
}

/**
 * Attach.
 */

var affixEmojiModifier;

function attach(parser) {
    if (!parser || !parser.parse) {
        throw new Error(
            '`parser` is not a valid parser for ' +
            '`attach(parser)`. Make sure something ' +
            'like `parse-latin` is passed.'
        );
    }

    /**
     * Make sure to not re-attach the modifier.
     */

    if (!affixEmojiModifier) {
        affixEmojiModifier = parser.constructor.modifier(mergeAffixEmoji);
    }

    parser.useFirst('tokenizeParagraph', affixEmojiModifier);
}

/**
 * Expose `attach`.
 */

module.exports = attach;
