/**
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').ParagraphContent} ParagraphContent
 *
 * @typedef {import('./complex-types').Emoticon} Emoticon
 */

import {modifyChildren} from 'unist-util-modify-children'

export const affixEmoticonModifier = modifyChildren(mergeAffixEmoticon)

/**
 * Merge emoticons into an `EmoticonNode`.
 *
 * @param {ParagraphContent} node
 * @param {number} index
 * @param {Paragraph} ancestor
 */
function mergeAffixEmoticon(node, index, ancestor) {
  const previous = ancestor.children[index - 1]

  if (index && 'children' in previous && 'children' in node) {
    const children = node.children
    let childIndex = -1

    while (++childIndex < children.length) {
      const child = children[childIndex]

      if (child.type === 'EmoticonNode') {
        previous.children.push(...children.slice(0, childIndex + 1))
        node.children = children.slice(childIndex + 1)

        if (child.position && node.position && previous.position) {
          previous.position.end = child.position.end
          node.position.start = child.position.end
        }

        // Next, iterate over the node again.
        return index
      }

      if (child.type !== 'WhiteSpaceNode') {
        break
      }
    }
  }
}
