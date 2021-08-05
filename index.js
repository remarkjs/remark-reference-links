/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast').Definition} Definition
 * @typedef {import('mdast').ImageReference} ImageReference
 * @typedef {import('mdast').LinkReference} LinkReference
 */

import {visit, SKIP} from 'unist-util-visit'

const own = {}.hasOwnProperty

/**
 * Plugin to transform links and images into references and definitions.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function remarkReferenceLinks() {
  return (tree) => {
    let id = 0
    /** @type {Record<string, Record<string, Definition>>} */
    const definitions = Object.create(null)
    /** @type {string[]} */
    const existing = []

    // Find existing definitions.
    visit(tree, 'definition', (node) => {
      const url = node.url

      existing.push(node.identifier)

      if (!own.call(definitions, url)) {
        definitions[url] = Object.create(null)
      }

      definitions[url][node.title || ''] = node
    })

    // Transform normal links and images into references and definitions, replaces
    // the current node, and adds a definition if needed.
    visit(tree, (node, index, parent) => {
      if (
        parent &&
        typeof index === 'number' &&
        (node.type === 'image' || node.type === 'link')
      ) {
        const url = node.url
        const title = node.title || ''
        /** @type {Record<string, Definition>} */
        const titles = own.call(definitions, url)
          ? definitions[url]
          : (definitions[url] = Object.create(null))
        /** @type {string} */
        let identifier

        if (own.call(titles, title)) {
          identifier = titles[title].identifier
        } else {
          do {
            identifier = String(++id)
          } while (existing.includes(identifier))

          /** @type {Definition} */
          const definition = {type: 'definition', identifier, title, url}

          titles[title] = definition

          tree.children.push(definition)
        }

        /** @type {ImageReference|LinkReference} */
        const replacement =
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

        parent.children[index] = replacement
        return [SKIP, index]
      }
    })
  }
}
