/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 */

import {modifyChildren} from 'unist-util-modify-children'

export const affixEmoticonModifier = modifyChildren(mergeAffixEmoticon)

/**
 * Merge emoticons into an `EmoticonNode`.
 *
 * @param {Node} node
 * @param {number} index
 * @param {Parent} ancestor
 */
function mergeAffixEmoticon(node, index, ancestor) {
  const previous = ancestor.children[index - 1]
  var childIndex = -1

  if (index && parent(previous) && parent(node)) {
    var children = node.children

    while (++childIndex < children.length) {
      const child = children[childIndex]

      if (child.type === 'EmoticonNode') {
        previous.children = [].concat(
          previous.children,
          children.slice(0, childIndex + 1)
        )
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

/**
 * @param {Node} node
 * @returns {node is Parent}
 */
function parent(node) {
  return 'children' in node
}
