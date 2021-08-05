# remark-reference-links

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to transform links and images into references and
definitions.

## Note!

This plugin is ready for the new parser in remark
([`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
No change is needed: it works exactly the same now as it did before!

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-reference-links
```

## Use

Say we have the following file, `example.md`:

```markdown
[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
```

And our module, `example.js`, looks as follows:

```js
import fs from 'node:fs'
import {remark} from 'remark'
import remarkReferenceLinks from 'remark-reference-links'

const buf = fs.readFileSync('example.md')

remark()
  .use(remarkReferenceLinks)
  .process(buf)
  .then((file) => {
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
[foo][1], [foo][1], [bar][1].

![foo][1], ![foo][1], ![bar][1].

[1]: http://example.com "Example Domain"
```

## API

This package exports no identifiers.
The default export is `remarkReferenceLinks`.

### `unified().use(remarkReferenceLinks)`

Plugin to transform links and images into references and definitions.

## Security

Use of `remark-reference-links` does not involve [**rehype**][rehype]
([**hast**][hast]) or user content so there are no openings for
[cross-site scripting (XSS)][xss] attacks.

## Related

*   [`remark-inline-links`](https://github.com/remarkjs/remark-inline-links)
    — Reverse of `remark-reference-links`, thus rewriting references and
    definitions into normal links and images
*   [`remark-defsplit`](https://github.com/eush77/remark-defsplit)
    — Practically the same as `remark-inline-links`, but with URI-based
    identifiers instead of numerical ones
*   [`remark-unlink`](https://github.com/eush77/remark-unlink)
    — Remove all links, references and definitions

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-reference-links/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-reference-links/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-reference-links.svg

[coverage]: https://codecov.io/github/remarkjs/remark-reference-links

[downloads-badge]: https://img.shields.io/npm/dm/remark-reference-links.svg

[downloads]: https://www.npmjs.com/package/remark-reference-links

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-reference-links.svg

[size]: https://bundlephobia.com/result?p=remark-reference-links

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
