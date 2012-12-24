var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');
var util     = require('../src/util');

test('constructor accepts HSL arguments', function (t) {
    util.times(100, common.generators.arbHSLA).forEach(function (hsla) {
        // HSL
        var h = hsla[0];
        var s = hsla[1];
        var l = hsla[2];
        var a = hsla[3];

        // HSL via CSS
        var cssHSL = common.css.hsl(hsla.slice(0, -1));
        t.doesNotThrow(function () {
            var color = new Chromath(cssHSL);
            common.tests.isChromath(color, t);
            common.tests.isLikeHSL(color, t);
        }, 'accepts hsl() with percentage values (like `hsl(50, 100%, 10%)`)');

        // HSL via object
        t.doesNotThrow(function () {
            var color = new Chromath({h:h, s:s, l:l});
            common.tests.isChromath(color, t);
            common.tests.isLikeHSL(color, t);
        }, 'accepts object values (like `{h: 123, s: 45%, l: 56%}`)');

        // HSLA via CSS
        var cssHSLA = common.css.hsla(hsla);
        t.doesNotThrow(function () {
            var color = new Chromath(cssHSLA);
            common.tests.isChromath(color, t);
            common.tests.isLikeHSLA(color, t);
        }, 'accepts hsla() with absolute values (like `hsla(123, 45%, 56%, 0.78)`)');

        // HSLA via object
        t.doesNotThrow(function () {
            var color = new Chromath({h:h, s:s, l:l, a:a});
            common.tests.isChromath(color, t);
            common.tests.isLikeHSLA(color, t);
        }, 'accepts object values (like `{h: 123, s: 45%, l: 45%, a: 0.12}`)');
    });
    t.end();
});
