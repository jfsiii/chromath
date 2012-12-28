var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');
var util     = require('../src/util');

test('constructor accepts HSB arguments', function (t) {
    util.times(100, common.generators.arbHSBA).forEach(function (hsba) {
        // HSB
        var h = hsba[0];
        var s = hsba[1];
        var l = hsba[2];
        var a = hsba[3];

        // HSB via CSS
        var cssHSB = common.css.hsb(hsba.slice(0, -1));
        t.doesNotThrow(function () {
            var color = new Chromath(cssHSB);
            common.tests.isChromath(color, t);
            common.tests.isLikeHSB(color, t);
        }, 'accepts hsb() with percentage values (like `hsb(50, 100%, 10%)`)');

        // HSB via object
        t.doesNotThrow(function () {
            var color = new Chromath({h:h, s:s, l:l});
            common.tests.isChromath(color, t);
            common.tests.isLikeHSB(color, t);
        }, 'accepts object values (like `{h: 123, s: 45%, l: 56%}`)');

        // HSBA via CSS
        var cssHSBA = common.css.hsba(hsba);
        t.doesNotThrow(function () {
            var color = new Chromath(cssHSBA);
            common.tests.isChromath(color, t);
            common.tests.isLikeHSBA(color, t);
        }, 'accepts hsba() with absolute values (like `hsba(123, 45%, 56%, 0.78)`)');

        // HSBA via object
        t.doesNotThrow(function () {
            var color = new Chromath({h:h, s:s, l:l, a:a});
            common.tests.isChromath(color, t);
            common.tests.isLikeHSBA(color, t);
        }, 'accepts object values (like `{h: 123, s: 45%, l: 45%, a: 0.12}`)');
    });
    t.end();
});
