import test from 'tape'
import remark from 'remark'
import referenceLinks from './index.js'

test('referenceLinks', function (t) {
  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(
        [
          '[foo](http://example.com "Example Domain"), ',
          '[foo](http://example.com "Example Domain"), ',
          '[bar](http://example.com "Example Domain").',
          '\n',
          '![foo](http://example.com "Example Domain"), ',
          '![foo](http://example.com "Example Domain"), ',
          '![bar](http://example.com "Example Domain").',
          '\n'
        ].join('')
      )
      .toString(),
    [
      '[foo][1], [foo][1], [bar][1].\n![foo][1], ![foo][1], ![bar][1].',
      '[1]: http://example.com "Example Domain"\n'
    ].join('\n\n'),
    'should work'
  )

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(
        [
          '[foo](http://example.com/1 "Example Domain 1") ',
          '![foo](http://example.com/2 "Example Domain 2")',
          '\n'
        ].join('')
      )
      .toString(),
    [
      '[foo][1] ![foo][2]',
      '[1]: http://example.com/1 "Example Domain 1"',
      '[2]: http://example.com/2 "Example Domain 2"\n'
    ].join('\n\n'),
    'reference links are numbered in order they’re seen'
  )

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(
        [
          '# Hello!',
          'This is a [thing][1] and [that](bravo.com) is a [thing][3]\nand [stuff](delta.com)',
          '[1]: alpha.com',
          '[3]: charlie.com\n'
        ].join('\n\n')
      )
      .toString(),
    [
      '# Hello!',
      'This is a [thing][1] and [that][2] is a [thing][3]\nand [stuff][4]',
      '[1]: alpha.com',
      '[3]: charlie.com',
      '[2]: bravo.com',
      '[4]: delta.com\n'
    ].join('\n\n'),
    'reference links don’t coalesce with existing identifiers'
  )

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync('[This](alpha.com "alpha").\n\n[That](alpha.com "bravo").\n')
      .toString(),
    [
      '[This][1].',
      '[That][2].',
      '[1]: alpha.com "alpha"',
      '[2]: alpha.com "bravo"\n'
    ].join('\n\n'),
    'should support same URLs with different titles'
  )

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(
        [
          '[This](alpha.com "alpha").',
          '[1]: alpha.com "bravo"',
          '[2]: alpha.com "charlie"\n'
        ].join('\n\n')
      )
      .toString(),
    [
      '[This][3].',
      '[1]: alpha.com "bravo"',
      '[2]: alpha.com "charlie"',
      '[3]: alpha.com "alpha"\n'
    ].join('\n\n'),
    'should not reuse the same url as a definition if it has a different title'
  )

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(
        [
          '[This](alpha.com "alpha").',
          '[That](alpha.com).',
          '[Thut](bravo.com "charlie").',
          '[this]: alpha.com "alpha"',
          '[thut]: bravo.com "delta"\n'
        ].join('\n\n')
      )
      .toString(),
    [
      '[This][this].',
      '[That][1].',
      '[Thut][2].',
      '[this]: alpha.com "alpha"',
      '[thut]: bravo.com "delta"',
      '[1]: alpha.com',
      '[2]: bravo.com "charlie"\n'
    ].join('\n\n'),
    'should use existing definitions if they exist'
  )

  t.end()
})
