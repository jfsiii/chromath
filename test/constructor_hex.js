var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');
var util     = require('../src/util');

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
