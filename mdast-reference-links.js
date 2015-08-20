(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mdastReferenceLinks = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"unist-util-visit":2}],2:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module unist:util:visit
 * @fileoverview Utility to recursively walk over unist nodes.
 */

'use strict';

/**
 * Walk forwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   forwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function forwards(values, callback) {
    var index = -1;
    var length = values.length;

    while (++index < length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Walk backwards.
 *
 * @param {Array.<*>} values - Things to iterate over,
 *   backwards.
 * @param {function(*, number): boolean} callback - Function
 *   to invoke.
 * @return {boolean} - False if iteration stopped.
 */
function backwards(values, callback) {
    var index = values.length;
    var length = -1;

    while (--index > length) {
        if (callback(values[index], index) === false) {
            return false;
        }
    }

    return true;
}

/**
 * Visit.
 *
 * @param {Node} tree - Root node
 * @param {string} [type] - Node type.
 * @param {function(node): boolean?} callback - Invoked
 *   with each found node.  Can return `false` to stop.
 * @param {boolean} [reverse] - By default, `visit` will
 *   walk forwards, when `reverse` is `true`, `visit`
 *   walks backwards.
 */
function visit(tree, type, callback, reverse) {
    var iterate;
    var one;
    var all;

    if (typeof type === 'function') {
        reverse = callback;
        callback = type;
        type = null;
    }

    iterate = reverse ? backwards : forwards;

    /**
     * Visit `children` in `parent`.
     */
    all = function (children, parent) {
        return iterate(children, function (child, index) {
            return child && one(child, index, parent);
        });
    };

    /**
     * Visit a single node.
     */
    one = function (node, index, parent) {
        var result;

        index = index || (parent ? 0 : null);

        if (!type || node.type === type) {
            result = callback(node, index, parent || null);
        }

        if (node.children && result !== false) {
            return all(node.children, node);
        }

        return result;
    };

    one(tree);
}

/*
 * Expose.
 */

module.exports = visit;

},{}]},{},[1])(1)
});