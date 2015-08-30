/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer
 * @license MIT
 * @module nlcst:affix-emoticon-modifier
 * @fileoverview Merge affix emoticons into the previous sentence in NLCST.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var modifier = require('unist-util-modify-children');

/*
 * Constants: node types.
 */

var EMOTICON_NODE = 'EmoticonNode';

/**
 * Merge emoticons into an `EmoticonNode`.
 *
 * @param {CSTNode} child - Node to check.
 * @param {number} index - Position of `child` in `parent`.
 * @param {CSTNode} parent - Parent of `child`.
 * @return {number?} - Either void, or the next index to
 *   iterate over.
 */
function mergeAffixEmoticon(child, index, parent) {
    var children = child.children;
    var position;
    var node;
    var prev;

    if (children && children.length && index !== 0) {
        position = -1;

        while (children[++position]) {
            node = children[position];

            if (node.type === EMOTICON_NODE) {
                prev = parent.children[index - 1];

                prev.children = prev.children.concat(
                    children.slice(0, position + 1)
                );

                child.children = children.slice(position + 1);

                if (node.position && child.position && prev.position) {
                    prev.position.end = child.position.start =
                        node.position.end;
                }

                /*
                 * Next, iterate over the node again.
                 */

                return index;
            }

            if (node.type !== 'WhiteSpaceNode') {
                break;
            }
        }
    }
}

/*
 * Expose.
 */

module.exports = modifier(mergeAffixEmoticon);
