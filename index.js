import {visit, SKIP} from 'unist-util-visit'

const own = {}.hasOwnProperty

export default function remarkReferenceLinks() {
  return transformer
}

function transformer(tree) {
  let id = 0
  const definitions = Object.create(null)
  const existing = []

  // Find existing definitions.
  visit(tree, 'definition', (node) => {
    const url = node.url

    existing.push(node.identifier)

    if (!own.call(definitions, url)) {
      definitions[url] = Object.create(null)
    }

    definitions[url][node.title] = node
  })

  // Transform normal links and images into references and definitions, replaces
  // the current node, and adds a definition if needed.
  visit(tree, ['image', 'link'], (node, index, parent) => {
    const url = node.url
    const title = node.title
    const titles = own.call(definitions, url)
      ? definitions[url]
      : (definitions[url] = Object.create(null))
    let identifier

    if (own.call(titles, title)) {
      identifier = titles[title].identifier
    } else {
      do {
        identifier = String(++id)
      } while (existing.includes(identifier))

      const definition = {type: 'definition', identifier, title, url}

      titles[title] = definition

      tree.children.push(definition)
    }

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
  })
}
