import assert from 'node:assert/strict'
import test from 'node:test'
import {remark} from 'remark'
import referenceLinks from './index.js'

test('referenceLinks', async function (t) {
  await t.test('should work', async function () {
    assert.equal(
      String(
        await remark()
          .use(referenceLinks)
          .process(
            [
              '[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").',
              '![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").'
            ].join('\n')
          )
      ),
      [
        '[foo][1], [foo][1], [bar][1].',
        '![foo][1], ![foo][1], ![bar][1].',
        '',
        '[1]: http://example.com "Example Domain"',
        ''
      ].join('\n')
    )
  })

  await t.test(
    'should number reference links in the order they’re seen',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(referenceLinks)
            .process(
              '[foo](http://example.com/1 "Example Domain 1") ![foo](http://example.com/2 "Example Domain 2")'
            )
        ),
        [
          '[foo][1] ![foo][2]',
          '',
          '[1]: http://example.com/1 "Example Domain 1"',
          '',
          '[2]: http://example.com/2 "Example Domain 2"',
          ''
        ].join('\n')
      )
    }
  )

  await t.test(
    'should not coalesce reference links with existing identifiers',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(referenceLinks)
            .process(
              [
                '# Hello!',
                'This is a [thing][1] and [that](bravo.com) is a [thing][3]',
                'and [stuff](delta.com)',
                '',
                '[1]: alpha.com',
                '[3]: charlie.com'
              ].join('\n')
            )
        ),
        [
          '# Hello!',
          '',
          'This is a [thing][1] and [that][2] is a [thing][3]',
          'and [stuff][4]',
          '',
          '[1]: alpha.com',
          '',
          '[3]: charlie.com',
          '',
          '[2]: bravo.com',
          '',
          '[4]: delta.com',
          ''
        ].join('\n')
      )
    }
  )

  await t.test(
    'should support same URLs with different titles',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(referenceLinks)
            .process('[This](alpha.com "alpha").\n\n[That](alpha.com "bravo").')
        ),
        [
          '[This][1].',
          '',
          '[That][2].',
          '',
          '[1]: alpha.com "alpha"',
          '',
          '[2]: alpha.com "bravo"',
          ''
        ].join('\n')
      )
    }
  )

  await t.test(
    'should not reuse the same url as a definition if it has a different title',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(referenceLinks)
            .process(
              [
                '[This](alpha.com "alpha").',
                '',
                '[1]: alpha.com "bravo"',
                '[2]: alpha.com "charlie"'
              ].join('\n')
            )
        ),
        [
          '[This][3].',
          '',
          '[1]: alpha.com "bravo"',
          '',
          '[2]: alpha.com "charlie"',
          '',
          '[3]: alpha.com "alpha"',
          ''
        ].join('\n')
      )
    }
  )

  await t.test(
    'should use existing definitions if they exist',
    async function () {
      assert.equal(
        String(
          await remark()
            .use(referenceLinks)
            .process(
              [
                '[This](alpha.com "alpha").',
                '',
                '[That](alpha.com).',
                '',
                '[Thut](bravo.com "charlie").',
                '',
                '[this]: alpha.com "alpha"',
                '[thut]: bravo.com "delta"'
              ].join('\n')
            )
        ),
        [
          '[This][this].',
          '',
          '[That][1].',
          '',
          '[Thut][2].',
          '',
          '[this]: alpha.com "alpha"',
          '',
          '[thut]: bravo.com "delta"',
          '',
          '[1]: alpha.com',
          '',
          '[2]: bravo.com "charlie"',
          ''
        ].join('\n')
      )
    }
  )
})
