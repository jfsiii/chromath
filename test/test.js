var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');

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

    common.times(100, common.generators.arbHex2Triplet).forEach(function (hexTriplet) {

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

    common.times(100, common.generators.arbHexTriplet).forEach(function (hexTriplet) {
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

test('constructor accepts RGB arguments', function (t) {
    common.times(100, common.generators.arbByteTriplet).forEach(function (byteTriplet) {
        // RGB
        var r     = byteTriplet[0];
        var g     = byteTriplet[1];
        var b     = byteTriplet[2];
        var a     = Number(Math.random().toFixed(1));
        var oRGB  = {r:r, g:g, b:b};
        var oRGBA = {r:r, g:g, b:b, a:a};

        // RGB via CSS
        var aRGBAbsolute   = [r, g, b];
        var cssRGBAbsolute = common.css.rgb(aRGBAbsolute);
        t.doesNotThrow(function () {
            var color = new Chromath(cssRGBAbsolute);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts rgb() with absolute values (like `rgb(123, 255, 55)`)');

        var aRGBPercentage = [
            Math.round(r / 255) + '%',
            Math.round(g / 255) + '%',
            Math.round(b / 255) + '%'
        ];
        var cssRGBPercentage = common.css.rgb(aRGBPercentage);
        t.doesNotThrow(function () {
            var color = new Chromath(cssRGBPercentage);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts rgb() with percentage values (like `rgb(50%, 100%, 10%)`)');

        // RGB via object
        t.doesNotThrow(function () {
            var color = new Chromath(oRGB);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts object values (like `{r: 123, g: 255, b: 55}`)');

        // RGBA via CSS
        var aRGBAAbsolute   = [r, g, b, a];
        var cssRGBAAbsolute = common.css.rgba(aRGBAAbsolute);
        t.doesNotThrow(function () {
            var color = new Chromath(cssRGBAAbsolute);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts rgba() with absolute values (like `rgba(123, 255, 55, 0.12)`)');

        var aRGBAPercentage = [
            Math.round(r / 255) + '%',
            Math.round(g / 255) + '%',
            Math.round(b / 255) + '%',
            a
        ];
        var cssRGBAPercentage = common.css.rgba(aRGBAPercentage);
        t.doesNotThrow(function () {
            var color = new Chromath(cssRGBAPercentage);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts rgba() with absolute values (like `rgba(123, 255, 55, 0.12)`)');

        // RGBA via object
        t.doesNotThrow(function () {
            var color = new Chromath(oRGBA);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts object values (like `{r: 123, g: 255, b: 55, a: 0.12}`)');
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


// HSL via CSS
// HSL via object
// HSLA via CSS
// HSLA via object

// HSV via CSS
// HSV via object
// HSVA via CSS
// HSVA via object

// HSB via CSS
// HSB via object
// HSBA via CSS
// HSBA via object

// RGB via integer (alpha currently ignored)
