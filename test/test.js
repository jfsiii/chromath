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

test('all Chromath.colors are Chromath instances', function (t) {
    var colors = Object.keys(Chromath.colors);

    t.plan(colors.length);
    for (var color in Chromath.colors) {
        var isChromath = Chromath.colors[color] instanceof Chromath;
        t.ok(isChromath, 'Chromath.colors.' + color + ' is Chromath');
    }
});
