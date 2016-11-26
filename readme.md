# remark-reference-links [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[**remark**][remark] plug-in to transform links and images into
references and definitions.

## Installation

[npm][]:

```bash
npm install remark-reference-links
```

## Usage

```javascript
var remark = require('remark');
var referenceLinks = require('remark-reference-links');

var file = remark().use(referenceLinks).process([
  '[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").',
  '',
  '![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").',
  ''
].join('\n'));

console.log(String(file));
```

Yields:

```md
[foo][1], [foo][1], [bar][1].

![foo][1], ![foo][1], ![bar][1].

[1]: http://example.com "Example Domain"
```

## API

### `remark.use(referenceLinks)`

Transform links and images into references and definitions.

## Related

*   [`wooorm/remark-inline-links`](https://github.com/wooorm/remark-inline-links)
    — Reverse, thus rewriting references and definitions into normal links
      and images;
*   [`eush77/remark-defsplit`](https://github.com/eush77/remark-defsplit)
    — Reverse, thus rewriting references and definitions into normal links
      and images, but with URI-based identifiers instead of
      numerical ones.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/wooorm/remark-reference-links.svg

[build-status]: https://travis-ci.org/wooorm/remark-reference-links

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/remark-reference-links.svg

[coverage-status]: https://codecov.io/github/wooorm/remark-reference-links

[chat-badge]: https://img.shields.io/gitter/room/wooorm/remark.svg

[chat]: https://gitter.im/wooorm/remark

[license]: LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[remark]: https://github.com/wooorm/remark
