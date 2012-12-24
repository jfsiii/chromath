var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');

test('all Chromath.parsers can at least process their example input', function (t) {

    Chromath.parsers.forEach(function (parser) {
        parser.example.forEach(function (example) {
            var parts = parser.regex.exec(example);
            t.ok(parts, 'regex can parse example');

            var channels = parser.process.apply(this, parts);
            common.tests.isLikeColor(channels, t);
        });
    });
    t.end();
});
