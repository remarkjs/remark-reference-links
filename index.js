'use strict';

var has = require('has');
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
  var url;
  var title;
  var titles;

  visit(node, 'definition', find(existing));
  visit(node, collect);

  for (url in definitions) {
    titles = definitions[url];
    for (title in titles) {
      children.push(titles[title]);
    }
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
    var url = node.url;
    var title = node.title;
    var replacement;
    var identifier;
    var titles;

    if (node.type !== 'image' && node.type !== 'link') {
      return;
    }

    if (has(definitions, url)) {
      titles = definitions[url];
    } else {
      titles = {};
      definitions[url] = titles;
    }

    if (has(titles, title)) {
      identifier = titles[title].identifier;
    } else {
      do {
        identifier = String(++id);
      } while (existing.indexOf(identifier) !== -1);

      titles[title] = {
        type: 'definition',
        identifier: identifier,
        title: title,
        url: url
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
