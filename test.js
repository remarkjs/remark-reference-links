/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module remark:reference-links:test
 * @fileoverview Test suite for remark-reference-links.
 */

'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var remark = require('remark');
var referenceLinks = require('./index.js');

/*
 * Tests.
 */

describe('remark-reference-links', function () {
    it('should work', function (done) {
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
            done(err);

            assert.equal(doc, [
                '[foo][1], [foo][1], [bar][1].',
                '',
                '![foo][1], ![foo][1], ![bar][1].',
                '',
                '[1]: http://example.com "Example Domain"',
                ''
            ].join('\n'));
        });
    });
});
