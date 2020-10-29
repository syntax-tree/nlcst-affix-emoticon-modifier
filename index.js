'use strict'

var modifier = require('unist-util-modify-children')

module.exports = modifier(mergeAffixEmoticon)

// Merge emoticons into an `EmoticonNode`.
function mergeAffixEmoticon(child, index, parent) {
  var siblings = parent.children
  var children = child.children
  var childIndex = -1

  if (children && children.length && index) {
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
