# remark-reference-links

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to change links and images to references with separate
definitions.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkReferenceLinks)`](#unifieduseremarkreferencelinks)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to turn links (`[text](url)`)
and images (`![alt](url)`) into references (`[text][id]`, `![alt][id]`) and
definitions (`[id]: url`).

## When should I use this?

This project is useful when you want to transform markdown and prefer that it
uses references and definitions.
Long URLs in source code can make reading markdown difficult.
References and definitions improve that by moving those URLs into definitions,
outside of paragraphs.

This plugin is very similar to the alternative
[`remark-defsplit`][remark-defsplit].
The difference is that that plugin generates identifiers based on hostnames of
URLs and places definitions at the end of each section, whereas this plugin
generates numeric identifiers at the end of the document.

A different plugin, [`remark-inline-links`][remark-inline-links], does the
inverse: turn references and definitions into links and images.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-reference-links
```

In Deno with [`esm.sh`][esmsh]:

```js
import remarkReferenceLinks from 'https://esm.sh/remark-reference-links@7'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import remarkReferenceLinks from 'https://esm.sh/remark-reference-links@7?bundle'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
# Pluto

[![Build](https://github.com/solar-system/pluto/workflows/main/badge.svg)](https://github.com/solar-system/pluto/actions)

## History

In the 1840s,
[Urbain Le Verrier](https://wikipedia.org/wiki/Urbain_Le_Verrier) used
Newtonian mechanics to predict the position of the then-undiscovered planet
[Neptune](https://wikipedia.org/wiki/Neptune) after analyzing perturbations
in the orbit of [Uranus](https://wikipedia.org/wiki/Uranus).
```

And our module `example.js` looks as follows:

```js
import {remark} from 'remark'
import remarkReferenceLinks from 'remark-reference-links'
import {read} from 'to-vfile'

const file = await remark()
  .use(remarkReferenceLinks)
  .process(await read('example.md'))

console.log(String(file))
```

…then running `node example.js` yields:

```markdown
# Pluto

[![Build][2]][1]

## History

In the 1840s,
[Urbain Le Verrier][3] used
Newtonian mechanics to predict the position of the then-undiscovered planet
[Neptune][4] after analyzing perturbations
in the orbit of [Uranus][5].

[1]: https://github.com/solar-system/pluto/actions

[2]: https://github.com/solar-system/pluto/workflows/main/badge.svg

[3]: https://wikipedia.org/wiki/Urbain_Le_Verrier

[4]: https://wikipedia.org/wiki/Neptune

[5]: https://wikipedia.org/wiki/Uranus
```

> 👉 **Note**: observe that definitions are added at the end of the document and
> that IDs are numeric identifiers.

## API

This package exports no identifiers.
The default export is [`remarkReferenceLinks`][api-remark-reference-links].

### `unified().use(remarkReferenceLinks)`

Change links and images to references with separate definitions.

###### Parameters

There are no parameters.

###### Returns

Transform ([`Transformer`][unified-transformer]).

## Types

This package is fully typed with [TypeScript][].
It exports no additional options.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `remark-reference-links@^7`,
compatible with Node.js 16.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Use of `remark-reference-links` does not involve **[rehype][]** (**[hast][]**)
or user content so there are no openings for [cross-site scripting
(XSS)][wiki-xss] attacks.

## Related

*   [`remark-defsplit`][remark-defsplit]
    — transform links and images into references and definitions with numeric
    IDs
*   [`remark-inline-links`][remark-inline-links]
    — transform references and definitions into normal links and images

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

[size-badge]: https://img.shields.io/bundlejs/size/remark-reference-links

[size]: https://bundlejs.com/?q=remark-reference-links

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[remark-defsplit]: https://github.com/remarkjs/remark-defsplit

[remark-inline-links]: https://github.com/remarkjs/remark-inline-links

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[api-remark-reference-links]: #unifieduseremarkreferencelinks
