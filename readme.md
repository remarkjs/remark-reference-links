# remark-reference-links [![Build Status](https://img.shields.io/travis/wooorm/remark-reference-links.svg)](https://travis-ci.org/wooorm/remark-reference-links) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/remark-reference-links.svg)](https://codecov.io/github/wooorm/remark-reference-links)

[**remark**](https://github.com/wooorm/remark) plug-in to transform
reference/definition style links and images into normal links and images.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install remark-reference-links
```

**remark-reference-links** is also available for
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed and compressed](https://github.com/wooorm/remark-reference-links/releases).

## Usage

Dependencies:

```javascript
var remark = require('remark');
var referenceLinks = require('remark-reference-links');
```

Process:

```javascript
var doc = remark().use(referenceLinks).process([
    '[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").',
    '',
    '![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").',
    ''
]);
```

Yields:

## API

### [remark](https://github.com/wooorm/remark#api).[use](https://github.com/wooorm/remark#remarkuseplugin-options)(referenceLinks)

Transform reference/definition style links and images into normal links
and images.

## Related

*   [remark-inline-links](https://github.com/wooorm/remark-inline-links)
    — Reverse, thus rewriting references and definitions into normal links
    and images.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
