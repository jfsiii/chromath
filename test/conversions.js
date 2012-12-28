var Chromath = require('..');
var test     = require('tap').test;
var common   = require('./common');
var util     = require('../src/util');

test('convert RGB to hexadecimal', function (t) {
    util.times(100, common.generators.arbRGB).forEach(function (aRGB) {
        // aRGB === [ 103, 3, 78 ]
        var aHex = Chromath.rgb2hex(aRGB);
        // aHex === [ '67', '03', '4E' ]
        var aRGB2 = aHex.map(function(hex) { return parseInt(hex, 16); });
        // aRGB2 === [ 103, 3, 78 ]
        t.equal(aRGB.toString(), aRGB2.toString());
    });
    t.end();
});
