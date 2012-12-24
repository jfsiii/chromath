var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');
var util     = require('../src/util');

test('constructor accepts RGB arguments', function (t) {
    common.times(100, common.generators.arbRGBA).forEach(function (aRGBA) {
        // RGB
        var r     = aRGBA[0];
        var g     = aRGBA[1];
        var b     = aRGBA[2];
        var a     = aRGBA[3];
        var aRGB  = [r, g, b];
        var oRGB  = {r:r, g:g, b:b};
        var oRGBA = {r:r, g:g, b:b, a:a};

        // RGB via CSS
        var cssRGBAbsolute = common.css.rgb(aRGB);
        t.doesNotThrow(function () {
            var color = new Chromath(cssRGBAbsolute);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts rgb() with absolute values (like `rgb(123, 255, 55)`)');

        var aRGBPercentage   = util.rgb.pctWithSymbol(aRGB);
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
        var cssRGBAAbsolute = common.css.rgba(aRGBA);
        t.doesNotThrow(function () {
            var color = new Chromath(cssRGBAAbsolute);
            common.tests.isChromath(color, t);
            common.tests.isLikeRGB(color, t);
        }, 'accepts rgba() with absolute values (like `rgba(123, 255, 55, 0.12)`)');

        var aRGBAPercentage   = aRGBPercentage.concat(a);
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
