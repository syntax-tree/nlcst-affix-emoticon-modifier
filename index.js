/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 */

import {modifyChildren} from 'unist-util-modify-children'

export const affixEmoticonModifier = modifyChildren(mergeAffixEmoticon)

/**
 * Merge emoticons into an `EmoticonNode`.
 *
 * @param {Node} child
 * @param {number} index
 * @param {Parent} parent
 */
function mergeAffixEmoticon(child, index, parent) {
  var siblings = parent.children
  /** @type {Array.<Node>} */
  // @ts-ignore looks like a parent.
  var children = child.children
  var childIndex = -1

  if (children && children.length > 0 && index) {
    while (++childIndex < children.length) {
      if (children[childIndex].type === 'EmoticonNode') {
        siblings[index - 1].children = [].concat(
          siblings[index - 1].children,
          children.slice(0, childIndex + 1)
        )
        child.children = children.slice(childIndex + 1)

        if (
          children[childIndex].position &&
          child.position &&
          siblings[index - 1].position
        ) {
          siblings[index - 1].position.end = children[childIndex].position.end
          child.position.start = children[childIndex].position.end
        }

        // Next, iterate over the node again.
        return index
      }

      if (children[childIndex].type !== 'WhiteSpaceNode') {
        break
      }
    }
  }
}
