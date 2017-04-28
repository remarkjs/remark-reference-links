'use strict';

var visit = require('unist-util-visit');

module.exports = referenceLinks;

function referenceLinks() {
  return transformer;
}

function transformer(node) {
  var definitions = {};
  var existing = [];
  var collect = factory(definitions, existing);
  var children = node.children;
  var link;

  visit(node, 'definition', find(existing));
  visit(node, collect);

  for (link in definitions) {
    children.push(definitions[link]);
  }
}

function find(existing) {
  return one;

  function one(node) {
    existing.push(node.identifier);
  }
}

/* Factory to transform a normal link/image into a
 * reference and a definition, replaces the current
 * node, and stores new definitions on `definitions`. */
function factory(definitions, existing) {
  var id = 0;

  return one;

  /* Transform a normal link/image based on bound
   * `definitions`. */
  function one(node, index, parent) {
    var link = node.url;
    var replacement;
    var identifier;

    if (node.type !== 'image' && node.type !== 'link') {
      return;
    }

    if (definitions[link]) {
      identifier = definitions[link].identifier;
    } else {
      do {
        identifier = String(++id);
      } while (existing.indexOf(identifier) !== -1);

      definitions[link] = {
        type: 'definition',
        identifier: identifier,
        title: node.title,
        url: link
      };
    }

    replacement = {
      type: node.type + 'Reference',
      identifier: id,
      referenceType: 'full'
    };

    if (node.type === 'image') {
      replacement.alt = node.alt;
    } else {
      replacement.children = node.children;
    }

    parent.children.splice(index, 1, replacement);
  }
}
