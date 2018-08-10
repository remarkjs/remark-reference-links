'use strict'

var test = require('tape')
var remark = require('remark')
var referenceLinks = require('.')

test('remark-reference-links', function(t) {
  var input = [
    '[foo](http://example.com "Example Domain"), ',
    '[foo](http://example.com "Example Domain"), ',
    '[bar](http://example.com "Example Domain").',
    '\n',
    '![foo](http://example.com "Example Domain"), ',
    '![foo](http://example.com "Example Domain"), ',
    '![bar](http://example.com "Example Domain").',
    '\n'
  ].join('')

  var expected = [
    '[foo][1], [foo][1], [bar][1].\n',
    '![foo][1], ![foo][1], ![bar][1].\n\n',
    '[1]: http://example.com "Example Domain"\n'
  ].join('')

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(input)
      .toString(),
    expected
  )

  t.end()
})

test('reference links are numbered in order they’re seen', function(t) {
  var input = [
    '[foo](http://example.com/1 "Example Domain 1") ',
    '![foo](http://example.com/2 "Example Domain 2")',
    '\n'
  ].join('')

  var expected = [
    '[foo][1] ![foo][2]\n\n',
    '[1]: http://example.com/1 "Example Domain 1"\n\n',
    '[2]: http://example.com/2 "Example Domain 2"\n'
  ].join('')

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(input)
      .toString(),
    expected
  )

  t.end()
})

test('reference links don’t coalesce with existing identifiers', function(t) {
  var input = [
    '# Hello!\n\n',
    'This is a [thing][1] and [that](bravo.com) is a [thing][3]\n',
    'and [stuff](delta.com)\n\n',
    '[1]: alpha.com\n\n',
    '[3]: charlie.com\n'
  ].join('')

  var expected = [
    '# Hello!\n\n',
    'This is a [thing][1] and [that][2] is a [thing][3]\n',
    'and [stuff][4]\n\n',
    '[1]: alpha.com\n\n',
    '[3]: charlie.com\n\n',
    '[2]: bravo.com\n\n',
    '[4]: delta.com\n'
  ].join('')

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(input)
      .toString(),
    expected
  )

  t.end()
})

test('should support same URLs with different titles', function(t) {
  var input = [
    '[This](alpha.com "alpha").\n\n',
    '[That](alpha.com "bravo").\n'
  ].join('')

  var expected = [
    '[This][1].\n\n',
    '[That][2].\n\n',
    '[1]: alpha.com "alpha"\n\n',
    '[2]: alpha.com "bravo"\n'
  ].join('')

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(input)
      .toString(),
    expected
  )

  t.end()
})

test('should not reuse the same url as a definition if it has a different title', function(t) {
  var input = [
    '[This](alpha.com "alpha").\n\n',
    '[1]: alpha.com "bravo"\n\n',
    '[2]: alpha.com "charlie"\n'
  ].join('')

  var expected = [
    '[This][3].\n\n',
    '[1]: alpha.com "bravo"\n\n',
    '[2]: alpha.com "charlie"\n\n',
    '[3]: alpha.com "alpha"\n'
  ].join('')

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(input)
      .toString(),
    expected
  )

  t.end()
})

test('should use existing definitions if they exist', function(t) {
  var input = [
    '[This](alpha.com "alpha").\n\n',
    '[That](alpha.com).\n\n',
    '[Thut](bravo.com "charlie").\n\n',
    '[this]: alpha.com "alpha"\n\n',
    '[thut]: bravo.com "delta"\n'
  ].join('')

  var expected = [
    '[This][this].\n\n',
    '[That][1].\n\n',
    '[Thut][2].\n\n',
    '[this]: alpha.com "alpha"\n\n',
    '[thut]: bravo.com "delta"\n\n',
    '[1]: alpha.com\n\n',
    '[2]: bravo.com "charlie"\n'
  ].join('')

  t.equal(
    remark()
      .use(referenceLinks)
      .processSync(input)
      .toString(),
    expected
  )

  t.end()
})
