var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');
var util     = require('../src/util');

////////////////////////////////////////
// the tests
////////////////////////////////////////
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
    for (var colorName in Chromath.colors) {
        common.tests.isChromath(Chromath.colors[colorName], t);
    }
});

test('constructor should error on bad input', function (t) {
    t.throws(function (){ new Chromath(); });
    t.throws(function (){ new Chromath(''); });
    t.throws(function (){ new Chromath(' '); });
    t.throws(function (){ new Chromath('Asdfapofas dfoiajs'); });
    t.throws(function (){ new Chromath('999ads9'); });
    t.throws(function (){ new Chromath('#BADHEX'); });
    t.end();
});

test('constructor accepts hex arguments', function (t) {

    util.times(100, common.generators.arbHex2Triplet).forEach(function (hexTriplet) {

        var r    = hexTriplet[0];
        var g    = hexTriplet[1];
        var b    = hexTriplet[2];
        var hex6 = r + g + b;

        // Hex (6 characters with hash)
        t.doesNotThrow(function () {
            var color = new Chromath('#' + hex6);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, '6 hex characters with a hash');

        // Hex (6 characters without hash)
        t.doesNotThrow(function () {
            var color = new Chromath(hex6);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, '6 hex characters without a hash');
    });

    util.times(100, common.generators.arbHexTriplet).forEach(function (hexTriplet) {
        var hex3 = hexTriplet.join('');
        // Hex (3 characters with hash)
        t.doesNotThrow(function () {
            var color = new Chromath('#' + hex3);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, '3 hex characters with a hash');

        // Hex (3 characters without hash)
        t.doesNotThrow(function () {
            var color = new Chromath(hex3);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, '3 hex characters without a hash');
    });

    t.end();
});

test('constructor accepts CSS2 color names', function (t) {
    var colors = require('../src/colornames_css2');
    var names  = Object.keys(colors);

    names.forEach(function (name) {
        t.doesNotThrow(function () {
            var color = new Chromath(name);
            common.tests.isChromath(color, t);
            common.tests.isLikeColor(color, t);
        });
    });
    t.end();
});

test('constructor accepts CSS3 color names', function (t) {
    var colors = require('../src/colornames_css3');
    var names  = Object.keys(colors);

    names.forEach(function (name) {
        t.doesNotThrow(function () {
            var color = new Chromath(name);
            common.tests.isChromath(color, t);
            common.tests.isLikeColor(color, t);
        });
    });
    t.end();
});

// HSV via CSS
// HSV via object
// HSVA via CSS
// HSVA via object

// HSB via CSS
// HSB via object
// HSBA via CSS
// HSBA via object

// RGB via integer (alpha currently ignored)
