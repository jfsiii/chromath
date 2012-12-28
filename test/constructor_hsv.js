var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');
var util     = require('../src/util');

test('constructor accepts HSV arguments', function (t) {
    util.times(100, common.generators.arbHSVA).forEach(function (hsva) {
        // HSV
        var h = hsva[0];
        var s = hsva[1];
        var l = hsva[2];
        var a = hsva[3];

        // HSV via CSS
        var cssHSV = common.css.hsv(hsva.slice(0, -1));
        t.doesNotThrow(function () {
            var color = new Chromath(cssHSV);
            common.tests.isChromath(color, t);
            common.tests.isLikeHSV(color, t);
        }, 'accepts hsv() with percentage values (like `hsv(50, 100%, 10%)`)');

        // HSV via object
        t.doesNotThrow(function () {
            var color = new Chromath({h:h, s:s, l:l});
            common.tests.isChromath(color, t);
            common.tests.isLikeHSV(color, t);
        }, 'accepts object values (like `{h: 123, s: 45%, l: 56%}`)');

        // HSVA via CSS
        var cssHSVA = common.css.hsva(hsva);
        t.doesNotThrow(function () {
            var color = new Chromath(cssHSVA);
            common.tests.isChromath(color, t);
            common.tests.isLikeHSVA(color, t);
        }, 'accepts hsva() with absolute values (like `hsva(123, 45%, 56%, 0.78)`)');

        // HSVA via object
        t.doesNotThrow(function () {
            var color = new Chromath({h:h, s:s, l:l, a:a});
            common.tests.isChromath(color, t);
            common.tests.isLikeHSVA(color, t);
        }, 'accepts object values (like `{h: 123, s: 45%, l: 45%, a: 0.12}`)');
    });
    t.end();
});
