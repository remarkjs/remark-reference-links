// Dependencies:
var remark = require('remark');
var referenceLinks = require('./index.js');

// Process:
var file = remark().use(referenceLinks).process([
    '[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").',
    '',
    '![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").',
    ''
].join('\n'));

// Yields:
console.log('md', String(file));
