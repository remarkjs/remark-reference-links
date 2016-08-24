/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:reference-links
 * @fileoverview
 *   Plug-in to transform normal links and images into
 *   reference/definition style links and images.
 */

'use strict';

/* Dependencies. */
var visit = require('unist-util-visit');

/* Expose. */
module.exports = attacher;

/* Attacher. */
function attacher() {
  return transformer;
}

/* Transformer. */
function transformer(node) {
  var definitions = {};
  var collect = factory(definitions);
  var children = node.children;
  var link;

  visit(node, collect);

  for (link in definitions) {
    children.push(definitions[link]);
  }
}

/* Factory to transform a normal link/image into a
 * reference and a definition, replaces the current
 * node, and stores new definitions on `definitions`. */
function factory(definitions) {
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
      identifier = String(++id);

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
