/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:reference-links:test
 * @fileoverview Test suite for remark-reference-links.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var remark = require('remark');
var referenceLinks = require('./index.js');

/*
 * Tests.
 */

test('remark-reference-links', function (t) {
    remark.use(referenceLinks).process([
        '[foo](http://example.com "Example Domain"), ' +
            '[foo](http://example.com "Example Domain"), ' +
            '[bar](http://example.com "Example Domain").',
        '',
        '![foo](http://example.com "Example Domain"), ' +
            '![foo](http://example.com "Example Domain"), ' +
            '![bar](http://example.com "Example Domain").',
        ''
    ].join('\n'), function (err, file, doc) {
        t.ifErr(err);

        t.equal(doc, [
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
    remark.use(referenceLinks).process([
        '[foo](http://example.com/1 "Example Domain 1") ' +
          '![foo](http://example.com/2 "Example Domain 2")',
        ''
    ].join('\n'), function (err, file, doc) {
        t.ifErr(err);

        t.equal(doc, [
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
