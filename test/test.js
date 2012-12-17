var Chromath = require('../chromath');
var test     = require('tap').test;
var util     = require('../util');
var qc       = require('quickcheck');

////////////////////////////////////////
// data generators
////////////////////////////////////////
function arbHex() {
    return (Math.floor(Math.random() * 16)).toString(16);
}

function arbHex2() {
    return arbHex() + arbHex();
}

function arbHexTriplet() {
    return [
        arbHex(),
        arbHex(),
        arbHex()
    ];
}

function arbHex2Triplet() {
    return [
        arbHex2(),
        arbHex2(),
        arbHex2()
    ];
}

function arbByteTriplet() {
    return [
        qc.arbByte(),
        qc.arbByte(),
        qc.arbByte()
    ];
}

////////////////////////////////////////
// test helpers
////////////////////////////////////////
function isChromath(color, t) {
    var result = color instanceof Chromath;

    if (t)
        return t.ok(result, 'is a Chromath instance');
    else
        return result;
}

function isLikeColor(channels, t) {
    var rgbLike = isLikeRGB(channels);
    var hslLike = isLikeHSL(channels);
    var result  = rgbLike || hslLike;

    if (t)
        return t.ok(result, 'is probably a color');
    else
        return result;
}

function isLikeRGB(channels, t) {
    var result = ('r' in channels) &&
        ('g' in channels) &&
        ('b' in channels);

    if (t)
        return t.ok(result, 'has properties r,g,b');
    else
        return result;
}

function isLikeHSL(channels, t) {
    var result = ('h' in channels) &&
        ('s' in channels) &&
        ( ('l' in channels) ||
          ('v' in channels) );

    if (t)
        return t.ok(result, 'has properties h,s,(l or v)');
    else
        return result;
}

function constructorTest (arg, t) {
    var color = new Chromath(arg);
    isChromath(color, t);
    isLikeColor(color, t);
}

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
    for (var color in Chromath.colors) {
        var isChromath = Chromath.colors[color] instanceof Chromath;
        t.ok(isChromath, 'Chromath.colors.' + color + ' is Chromath');
    }
});

test('all Chromath.parsers can at least process their example input', function (t) {

    Chromath.parsers.forEach(function (parser) {
        parser.example.forEach(function (example) {
            var parts = parser.regex.exec(example);
            t.ok(parts, 'regex can parse example');

            var channels = parser.process.apply(this, parts);
            isLikeColor(channels, t);
        });
    });
    t.end();
});

test('constructor should error on bad input', function (t) {
    t.throws(function(){ new Chromath(); });
    t.throws(function(){ new Chromath(''); });
    t.throws(function(){ new Chromath(' '); });
    t.throws(function(){ new Chromath('Asdfapofas dfoiajs'); });
    t.throws(function(){ new Chromath('999ads9'); });
    t.end();
});

test('constructor accepts hex arguments', function (t) {

    qc.arbArray(arbHex2Triplet).forEach(function (hexTriplet) {

        var r    = hexTriplet[0];
        var g    = hexTriplet[1];
        var b    = hexTriplet[2];
        var hex6 = r + g + b;

        // Hex (6 characters with hash)
        t.doesNotThrow(function() {
            constructorTest('#'+hex6, t);
        }, '6 hex characters with a hash');

        // Hex (6 characters without hash)
        t.doesNotThrow(function() {
            constructorTest(hex6, t);
        }, '6 hex characters without a hash');
    });

    qc.arbArray(arbHexTriplet).forEach(function (hexTriplet) {
        var hex3 = hexTriplet.join('');
        // Hex (3 characters with hash)
        t.doesNotThrow(function() {
            constructorTest('#'+hex3, t);
        }, '3 hex characters with a hash');

        // Hex (3 characters without hash)
        t.doesNotThrow(function() {
            constructorTest(hex3, t);
        }, '3 hex characters without a hash');
    });

    t.end();
});

test('constructor accepts RGB arguments', function (t) {
    qc.arbArray(arbByteTriplet).forEach(function (byteTriplet) {
        // RGB
        var r     = byteTriplet[0];
        var g     = byteTriplet[1];
        var b     = byteTriplet[2];
        var a     = Number(Math.random().toFixed(1));
        var oRGB  = {r:r, g:g, b:b};
        var oRGBA = {r:r, g:g, b:b, a:a};

        // RGB via CSS
        var aRGBAbsolute = [r, g, b];
        var cssRGBAbsolute = 'rgb(' + aRGBAbsolute.join(',') + ')';
        t.doesNotThrow(function() {
            constructorTest(cssRGBAbsolute, t);
        }, 'accepts rgb() with absolute values (like `rgb(123, 255, 55)`)');

        var aRGBPercentage = [
            Math.round(r / 255) + '%',
            Math.round(g / 255) + '%',
            Math.round(b / 255) + '%'
        ];
        var cssRGBPercentage = 'rgb(' + aRGBPercentage.join(',') + ')';
        t.doesNotThrow(function() {
            constructorTest(cssRGBPercentage, t);
        }, 'accepts rgb() with percentage values (like `rgb(50%, 100%, 10%)`)');

        // RGB via object
        t.doesNotThrow(function() {
            constructorTest(oRGB, t);
        }, 'accepts object values (like `{r: 123, g: 255, b: 55})');

        // RGBA via CSS
        var aRGBAAbsolute = [r, g, b, a];
        var cssRGBAAbsolute = 'rgba(' + aRGBAAbsolute.join(',') + ')';
        t.doesNotThrow(function() {
            constructorTest(cssRGBAAbsolute, t);
        }, 'accepts rgba() with absolute values (like `rgba(123, 255, 55, 0.12)`)');

        var aRGBAPercentage = [
            Math.round(r/255) + '%',
            Math.round(g/255) + '%',
            Math.round(b/255) + '%',
            a
        ];
        var cssRGBAPercentage = 'rgba(' + aRGBAPercentage.join(',') + ')';
        t.doesNotThrow(function() {
            constructorTest(cssRGBAPercentage, t);
        }, 'accepts rgba() with absolute values (like `rgba(123, 255, 55, 0.12)`)');

        // RGBA via object
        t.doesNotThrow(function() {
            constructorTest(oRGBA, t);
        }, 'accepts object values (like `{r: 123, g: 255, b: 55, a: 0.12})');
    });
    t.end();
});

test('can parse HTML4 color names', function (t) {
    var colors = require('../colornames_html4');
    var names  = Object.keys(colors);

    names.forEach(function (name) {
        t.doesNotThrow(function() {
            constructorTest(name, t);
        });
    });
    t.end();
});

test('can parse CSS3 color names', function (t) {
    var colors = require('../colornames_css3');
    var names  = Object.keys(colors);

    names.forEach(function (name) {
        t.doesNotThrow(function() {
            constructorTest(name, t);
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
