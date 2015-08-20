/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module mdast:reference-links
 * @fileoverview
 *   Plug-in to transform normal links and images into
 *   reference/definition style links and images.
 */

'use strict';

/*
 * Dependencies.
 */

var visit = require('unist-util-visit');

/**
 * Factory to transform a normal link/image into a
 * reference and a definition, replaces the current
 * node, and stores new definitions on `definitions`.
 *
 * @param {Object.<string, Node>} definitions - Map of
 *   identifiers to definitions.
 * @return {function(node, index, parent)}
 */
function factory(definitions) {
    var id = 0;

    /**
     * Transform a normal link/image based on bound
     * `definitions`.
     *
     * @param {Node} node - Link or image node.
     * @param {number} index - Position of `node` in
     *   `parent`
     * @param {Node} parent - Parent of `node`.
     */
    function item(node, index, parent) {
        var link = node.src || node.href;
        var replacement;
        var identifier;

        if (!definitions[link]) {
            identifier = String(++id);

            definitions[link] = {
                'type': 'definition',
                'identifier': identifier,
                'title': node.title,
                'link': link
            };
        } else {
            identifier = definitions[link].identifier;
        }

        replacement = {
            'type': (node.type === 'image' ? 'image' : 'link') + 'Reference',
            'identifier': id,
            'referenceType': 'full'
        };

        if (node.type === 'image') {
            replacement.alt = node.alt;
        } else {
            replacement.children = node.children;
        }

        parent.children.splice(index, 1, replacement);
    }

    return item;
}

/**
 * Transformer.
 *
 * @param {Node} node - Node to visit.
 */
function transformer(node) {
    var definitions = {};
    var collect = factory(definitions);
    var children = node.children;
    var link;

    visit(node, 'image', collect);
    visit(node, 'link', collect);

    for (link in definitions) {
        children.push(definitions[link]);
    }
}

/**
 * Attacher.
 *
 * @return {function(node)}
 */
function attacher() {
    return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
