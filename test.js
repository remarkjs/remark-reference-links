'use strict';

var test = require('tape');
var remark = require('remark');
var referenceLinks = require('./index.js');

test('remark-reference-links', function (t) {
  remark().use(referenceLinks).process([
    '[foo](http://example.com "Example Domain"), ' +
      '[foo](http://example.com "Example Domain"), ' +
      '[bar](http://example.com "Example Domain").',
    '',
    '![foo](http://example.com "Example Domain"), ' +
      '![foo](http://example.com "Example Domain"), ' +
      '![bar](http://example.com "Example Domain").',
    ''
  ].join('\n'), function (err, file) {
    t.ifErr(err);

    t.equal(String(file), [
      '[foo][1], [foo][1], [bar][1].',
      '',
      '![foo][1], ![foo][1], ![bar][1].',
      '',
      '[1]: http://example.com "Example Domain"',
      ''
    ].join('\n'));

    t.end();
  });
});

test('reference links are numbered in order they\'re seen', function (t) {
  remark().use(referenceLinks).process([
    '[foo](http://example.com/1 "Example Domain 1") ' +
      '![foo](http://example.com/2 "Example Domain 2")',
    ''
  ].join('\n'), function (err, file) {
    t.ifErr(err);

    t.equal(String(file), [
      '[foo][1] ![foo][2]',
      '',
      '[1]: http://example.com/1 "Example Domain 1"',
      '',
      '[2]: http://example.com/2 "Example Domain 2"',
      ''
    ].join('\n'));

    t.end();
  });
});

test('reference links don’t coalesce with existing identifiers', function (t) {
  remark().use(referenceLinks).process([
    '# Hello!',
    '',
    'This is a [thing][1] and [that](bravo.com) is a [thing][3]',
    'and [stuff](delta.com)',
    '',
    '[1]: alpha.com',
    '',
    '[3]: charlie.com',
    ''
  ].join('\n'), function (err, file) {
    t.ifErr(err);

    t.equal(String(file), [
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
    ].join('\n'));

    t.end();
  });
});
