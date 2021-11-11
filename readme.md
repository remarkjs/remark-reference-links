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

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast.

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

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-reference-links
```

In Deno with [Skypack][]:

```js
import remarkReferenceLinks from 'https://cdn.skypack.dev/remark-reference-links@6?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import remarkReferenceLinks from 'https://cdn.skypack.dev/remark-reference-links@6?min'
</script>
```

## Use

Say we have the following file `example.md`:

```markdown
# Some project

[![Build](https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg)](https://github.com/remarkjs/remark-defsplit/actions)

## Section

[A link](https://example.com)
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkReferenceLinks from 'remark-reference-links'

main()

async function main() {
  const file = await remark()
    .use(remarkReferenceLinks)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```markdown
# Some project

[![Build][2]][1]

## Section

[A link][3]

[1]: https://github.com/remarkjs/remark-defsplit/actions

[2]: https://github.com/remarkjs/remark-defsplit/workflows/main/badge.svg

[3]: https://example.com
```

> 👉 **Note**: Observe that definitions are added at the end of the document and
> that IDs are numeric identifiers.

## API

This package exports no identifiers.
The default export is `remarkReferenceLinks`.

### `unified().use(remarkReferenceLinks)`

Plugin to change links and images to references with separate definitions.
There are no options.

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Use of `remark-reference-links` does not involve **[rehype][]** (**[hast][]**)
or user content so there are no openings for [cross-site scripting (XSS)][xss]
attacks.

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

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-reference-links.svg

[size]: https://bundlephobia.com/result?p=remark-reference-links

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast

[remark-defsplit]: https://github.com/remarkjs/remark-defsplit

[remark-inline-links]: https://github.com/remarkjs/remark-inline-links
