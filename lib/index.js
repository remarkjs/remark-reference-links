/**
 * @typedef {import('mdast').Root} Root
 */

import {SKIP, visit} from 'unist-util-visit'

/**
 * Change links and images to references with separate definitions.
 *
 * @returns
 *   Transform.
 */
export default function remarkReferenceLinks() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    let id = 0
    /** @type {Map<string, Map<string, string>>} */
    const definitions = new Map()
    /** @type {Set<string>} */
    const existing = new Set()

    // Find existing definitions.
    visit(tree, 'definition', function (node) {
      const url = node.url

      existing.add(node.identifier)

      let titles = definitions.get(url)

      if (!titles) {
        titles = new Map()
        definitions.set(url, titles)
      }

      titles.set(node.title || '', node.identifier)
    })

    // Transform normal links and images into references and definitions, replaces
    // the current node, and adds a definition if needed.
    visit(tree, function (node, index, parent) {
      if (
        parent &&
        typeof index === 'number' &&
        (node.type === 'image' || node.type === 'link')
      ) {
        const url = node.url
        const title = node.title
        let titles = definitions.get(url)

        if (!titles) {
          titles = new Map()
          definitions.set(url, titles)
        }

        let identifier = titles.get(title || '')

        if (!identifier) {
          do {
            identifier = String(++id)
          } while (existing.has(identifier))

          titles.set(title || '', identifier)
          tree.children.push({type: 'definition', identifier, title, url})
        }

        parent.children[index] =
          node.type === 'image'
            ? {
                type: 'imageReference',
                identifier,
                referenceType: 'full',
                alt: node.alt
              }
            : {
                type: 'linkReference',
                identifier,
                referenceType: 'full',
                children: node.children
              }
        return [SKIP, index]
      }
    })
  }
}
