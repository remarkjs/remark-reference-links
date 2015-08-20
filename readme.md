# mdast-reference-links [![Build Status](https://img.shields.io/travis/wooorm/mdast-reference-links.svg)](https://travis-ci.org/wooorm/mdast-reference-links) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/mdast-reference-links.svg)](https://codecov.io/github/wooorm/mdast-reference-links)

[**mdast**](https://github.com/wooorm/mdast) plug-in to transform
reference/definition style links and images into normal links and images.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install mdast-reference-links
```

**mdast-reference-links** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](mdast-reference-links.js) and
[compressed](mdast-reference-links.min.js).

## Usage

Dependencies:

```javascript
var mdast = require('mdast');
var referenceLinks = require('mdast-reference-links');
```

Process:

```javascript
var doc = mdast().use(referenceLinks).process(`[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").
![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
`);
```

Yields:

```md
[foo][1], [foo][1], [bar][1].

![foo][1], ![foo][1], ![bar][1].

[1]: http://example.com "Example Domain"
```

## API

### [mdast](https://github.com/wooorm/mdast#api).[use](https://github.com/wooorm/mdast#mdastuseplugin-options)(referenceLinks)

Transform reference/definition style links and images into normal links
and images.

## Related

*   [mdast-inline-links](https://github.com/wooorm/mdast-inline-links)
    — Reverse, thus rewriting references and definitions into normal links
    and images.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
