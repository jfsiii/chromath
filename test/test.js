var Chromath = require('..');
var test = require('tap').test;

test('all Chromath.colors values are also available on Chromath', function (t) {
    var colors = Object.keys(Chromath.colors);

    t.plan(colors.length);
    colors.forEach(function (color) {
        var hasColor = Chromath.hasOwnProperty(color);
        t.ok(hasColor, 'has Chromath.' + color);
    });
});
