/**
 * @typedef {import('nlcst').Paragraph} Paragraph
 * @typedef {import('nlcst').ParagraphContent} ParagraphContent
 */

import {modifyChildren} from 'unist-util-modify-children'

const modifier = modifyChildren(mergeAffixEmoticon)

/**
 * Merge emoticons in `node` into `EmoticonNode`s.
 *
 * @param {Paragraph} node
 *   nlcst paragraph to transform.
 * @returns {undefined}
 *   Nothing.
 */
export function affixEmoticonModifier(node) {
  modifier(node)
}

/**
 * Merge emoticons into an `EmoticonNode`.
 *
 * @param {ParagraphContent} child
 *   Child.
 * @param {number} index
 *   Index of `child` in `parent`.
 * @param {Paragraph} parent
 *   Parent of `child`.
 * @returns {number | undefined}
 *   Next child to move to.
 */
function mergeAffixEmoticon(child, index, parent) {
  const previous = parent.children[index - 1]

  if (index && 'children' in previous && 'children' in child) {
    const children = child.children
    let childIndex = -1

    while (++childIndex < children.length) {
      const descendant = children[childIndex]

      if (descendant.type === 'EmoticonNode') {
        previous.children.push(...children.slice(0, childIndex + 1))
        child.children = children.slice(childIndex + 1)

        if (descendant.position && child.position && previous.position) {
          previous.position.end = descendant.position.end
          child.position.start = descendant.position.end
        }

        // Next, iterate over the child again.
        return index
      }

      if (descendant.type !== 'WhiteSpaceNode') {
        break
      }
    }
  }
}
