// Dependencies:
var mdast = require('mdast');
var referenceLinks = require('./index.js');

// Process:
var doc = mdast().use(referenceLinks).process(`[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
`);

// Yields:
console.log('md', doc);
