// Dependencies:
var remark = require('remark');
var referenceLinks = require('./index.js');

// Process:
var doc = remark().use(referenceLinks).process(`[foo](http://example.com "Example Domain"), [foo](http://example.com "Example Domain"), [bar](http://example.com "Example Domain").

![foo](http://example.com "Example Domain"), ![foo](http://example.com "Example Domain"), ![bar](http://example.com "Example Domain").
`);

// Yields:
console.log('md', doc);
