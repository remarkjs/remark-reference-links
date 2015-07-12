'use strict';

/* eslint-env mocha */

/*
 * Dependencies.
 */

var referenceLinks = require('./index.js');
var mdast = require('mdast');
var assert = require('assert');

/*
 * Tests.
 */

describe('mdast-reference-links', function () {
    it('should work', function (done) {
        mdast.use(referenceLinks).process([
            '[foo](http://example.com "Example Domain"), ' +
                '[foo](http://example.com "Example Domain"), ' +
                '[bar](http://example.com "Example Domain").',
            '',
            '![foo](http://example.com "Example Domain"), ' +
                '![foo](http://example.com "Example Domain"), ' +
                '![bar](http://example.com "Example Domain").',
            ''
        ].join('\n'), function (err, doc) {
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
