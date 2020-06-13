'use strict'

var modifier = require('unist-util-modify-children')

module.exports = modifier(mergeAffixEmoticon)

var emoticonNode = 'EmoticonNode'

// Merge emoticons into an `EmoticonNode`.
function mergeAffixEmoticon(child, index, parent) {
  var children = child.children
  var position
  var node
  var previous

  if (children && children.length !== 0 && index !== 0) {
    position = -1

    while (children[++position]) {
      node = children[position]

      if (node.type === emoticonNode) {
        previous = parent.children[index - 1]

        previous.children = previous.children.concat(
          children.slice(0, position + 1)
        )
        child.children = children.slice(position + 1)

        if (node.position && child.position && previous.position) {
          previous.position.end = node.position.end
          child.position.start = node.position.end
        }

        // Next, iterate over the node again.
        return index
      }

      if (node.type !== 'WhiteSpaceNode') {
        break
      }
    }
  }
}
