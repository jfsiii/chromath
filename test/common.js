var Chromath = require('..');
var qc       = require('quickcheck');

////////////////////////////////////////
// data generators
////////////////////////////////////////
var arbHex = function arbHex() {
    return (Math.floor(Math.random() * 16)).toString(16);
};

var arbHex2 = function arbHex2() {
    return arbHex() + arbHex();
};

var arbHexTriplet = function arbHexTriplet() {
    return [
        arbHex(),
        arbHex(),
        arbHex()
    ];
};

var arbHex2Triplet = function arbHex2Triplet() {
    return [
        arbHex2(),
        arbHex2(),
        arbHex2()
    ];
};

var arbPct01 = function arbPct01() {
    return Number(Math.random().toFixed(2));
};

var arbRGB = function arbRGB() {
    return [
        qc.arbByte(),
        qc.arbByte(),
        qc.arbByte()
    ];
};

var arbRGBA = function arbRGBA() {
    var rgb  = arbRGB();
    var a    = arbPct01();
    var rgba = rgb.concat(a);

    return rgba;
};

var arbHSL = function arbHSL() {

    return [
        qc.arbIntBetween(0, 360),
        qc.arbIntBetween(0, 100) + '%',
        qc.arbIntBetween(0, 100) + '%'
    ];
};

var arbHSLA = function arbHSLA() {
    var hsl  = arbHSL();
    var a    = arbPct01();
    var hsla = hsl.concat(a);

    return hsla;
};

var arbHSV = function arbHSV() {

    return [
        qc.arbIntBetween(0, 360),
        qc.arbIntBetween(0, 100) + '%',
        qc.arbIntBetween(0, 100) + '%'
    ];
};

var arbHSVA = function arbHSVA() {
    var hsv  = arbHSV();
    var a    = arbPct01();
    var hsva = hsv.concat(a);

    return hsva;
};

////////////////////////////////////////
// test helpers
////////////////////////////////////////
var isChromath = function isChromath(color, t) {
    var result = color instanceof Chromath;

    if (t)
        return t.ok(result, 'is a Chromath instance');
    else
        return result;
};

var hasChannels = function hasChannels(expected, actual, t) {
    var result = expected.every(function (channel) {
        return channel in actual;
    });

    if (t)
        t.ok(result, 'has properties ' + expected);
    else
        return result;
};

var isLikeRGB = function isLikeRGB(channels, t) {
    var expected = ['r', 'g', 'b'];
    var result   = hasChannels(expected, channels, t);

    if (!t) return result;
};

var isLikeRGBA = function isLikeRGBA(channels, t) {
    var expected = ['r', 'g', 'b', 'a'];
    var result   = hasChannels(expected, channels, t);

    if (!t) return result;
};

var isLikeHSL = function isLikeHSL(channels, t) {
    var expected = ['h', 'sl', 'l'];
    var result   = hasChannels(expected, channels, t);

    if (!t) return result;
};

var isLikeHSLA = function isLikeHSLA(channels, t) {
    var expected = ['h', 'sl', 'l', 'a'];
    var result   = hasChannels(expected, channels, t);

    if (!t) return result;
};

var isLikeHSV = function isLikeHSV(channels, t) {
    var expected = ['h', 'sv', 'v'];
    var result   = hasChannels(expected, channels, t);

    if (!t) return result;
};

var isLikeHSVA = function isLikeHSV(channels, t) {
    var expected = ['h', 'sv', 'v', 'a'];
    var result   = hasChannels(expected, channels, t);

    if (!t) return result;
};

var isLikeColor = function isLikeColor(channels, t) {
    var result = isLikeRGB(channels) || isLikeHSL(channels) || isLikeHSV(channels);

    if (t)
        return t.ok(result, 'is probably a color');
    else
        return result;
};

var cssFunctionString = function cssFunctionString(fnName, parts) {
    return fnName + '(' + parts.join(', ') + ')';
};

//////////////////////////////

module.exports.css = {};
['rgb', 'rgba',
 'hsl', 'hsla',
 'hsv', 'hsva',
 'hsb', 'hsba'
].forEach(function (fnName) {
    module.exports.css[fnName] = (function (fnName) {
        return function (parts) {
            return cssFunctionString('rgb', parts);
        };
    })(fnName);
});

module.exports.generators = {
    arbPct01       : arbPct01,
    arbHex         : arbHex,
    arbHex2        : arbHex2,
    arbHexTriplet  : arbHexTriplet,
    arbHex2Triplet : arbHex2Triplet,
    arbRGB         : arbRGB,
    arbRGBA        : arbRGBA,
    arbHSL         : arbHSL,
    arbHSLA        : arbHSLA,
    arbHSV         : arbHSV,
    arbHSVA        : arbHSVA,
    arbHSB         : arbHSV,
    arbHSBA        : arbHSVA
};

module.exports.tests = {
    isChromath  : isChromath,
    isLikeColor : isLikeColor,
    isLikeRGB   : isLikeRGB,
    isLikeRGBA  : isLikeRGBA,
    isLikeHSL   : isLikeHSL,
    isLikeHSLA  : isLikeHSLA,
    isLikeHSV   : isLikeHSV,
    isLikeHSVA  : isLikeHSVA,
    isLikeHSB   : isLikeHSV,
    isLikeHSBA  : isLikeHSVA
};
