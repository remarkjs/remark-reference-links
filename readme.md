# remark-reference-links [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

[**remark**][remark] plug-in to transform links and images into
references and definitions

## Installation

[npm][npm-install]:

```bash
npm install remark-reference-links
```

**remark-reference-links** is also available as an AMD, CommonJS, and
globals module, [uncompressed and compressed][releases].

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
].join('\n'));
```

Yields:

```md
[foo][1], [foo][1], [bar][1].

![foo][1], ![foo][1], ![bar][1].

[1]: http://example.com "Example Domain"
```

## API

### `remark.use(referenceLinks)`

links and images into references and definitions

## Related

*   [`eush77/remark-defsplit`](https://github.com/eush77/remark-defsplit)
    — Reverse, thus rewriting references and definitions into normal links
      and images, but with URI-based identifiers instead of
      numerical ones;

*   [`wooorm/remark-reference-links`](https://github.com/wooorm/remark-reference-links)
    — Reverse, thus rewriting references and definitions into normal links
      and images.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/remark-reference-links/master.svg

[travis]: https://travis-ci.org/wooorm/remark-reference-links

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-reference-links.svg

[codecov]: https://codecov.io/github/wooorm/remark-reference-links

[npm-install]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/remark-reference-links/releases

[license]: LICENSE

[author]: http://wooorm.com

[remark]: https://github.com/wooorm/remark
