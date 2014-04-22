var util = require('./util');

module.exports = function ChromathStaticMethods(Chromath) {
  /*
    Constructor: Chromath.rgb
    Create a new <Chromath> instance from RGB values

    Parameters:
    r - Number, 0-255, representing the green channel OR Array OR object (with keys r,g,b) of RGB values
    g - Number, 0-255, representing the green channel
    b - Number, 0-255, representing the red channel
    a - (Optional) Float, 0-1, representing the alpha channel

   Returns:
   <Chromath>

   Examples:
   > > new Chromath.rgb(123, 234, 56).toString()
   > "#7BEA38"

   > > new Chromath.rgb([123, 234, 56]).toString()
   > "#7BEA38"

   > > new Chromath.rgb({r: 123, g: 234, b: 56}).toString()
   > "#7BEA38"
   */
  Chromath.rgb = function (r, g, b, a)
  {
      var rgba = util.rgb.fromArgs(r, g, b, a);
      r = rgba[0], g = rgba[1], b = rgba[2], a = rgba[3];

      return new Chromath({r: r, g: g, b: b, a: a});
  };

  /*
    Constructor: Chromath.rgba
    Alias for <Chromath.rgb>
  */
  Chromath.rgba = Chromath.rgb;

  /*
    Constructor: Chromath.hsl
    Create a new Chromath instance from HSL values

    Parameters:
    h - Number, -Infinity - Infinity, representing the hue OR Array OR object (with keys h,s,l) of HSL values
    s - Number, 0-1, representing the saturation
    l - Number, 0-1, representing the lightness
    a - (Optional) Float, 0-1, representing the alpha channel

    Returns:
    <Chromath>

    Examples:
    > > new Chromath.hsl(240, 1, 0.5).toString()
    > "#0000FF"

    > > new Chromath.hsl([240, 1, 0.5]).toString()
    > "#0000FF"

    > new Chromath.hsl({h:240, s:1, l:0.5}).toString()
    > "#0000FF"
   */
  Chromath.hsl = function (h, s, l, a)
  {
      var hsla = util.hsl.fromArgs(h, s, l, a);
      h = hsla[0], s = hsla[1], l = hsla[2], a = hsla[3];

      return new Chromath({h: h, s: s, l: l, a: a});
  };

  /*
    Constructor: Chromath.hsla
    Alias for <Chromath.hsl>
  */
  Chromath.hsla = Chromath.hsl;

  /*
    Constructor: Chromath.hsv
    Create a new Chromath instance from HSV values

    Parameters:
    h - Number, -Infinity - Infinity, representing the hue OR Array OR object (with keys h,s,l) of HSV values
    s - Number, 0-1, representing the saturation
    v - Number, 0-1, representing the lightness
    a - (Optional) Float, 0-1, representing the alpha channel

    Returns:
    <Chromath>

    Examples:
    > > new Chromath.hsv(240, 1, 1).toString()
    > "#0000FF"

    > > new Chromath.hsv([240, 1, 1]).toString()
    > "#0000FF"

    > > new Chromath.hsv({h:240, s:1, v:1}).toString()
    > "#0000FF"
   */
  Chromath.hsv = function (h, s, v, a)
  {
      var hsva = util.hsl.fromArgs(h, s, v, a);
      h = hsva[0], s = hsva[1], v = hsva[2], a = hsva[3];

      return new Chromath({h: h, s: s, v: v, a: a});
  };

  /*
    Constructor: Chromath.hsva
    Alias for <Chromath.hsv>
  */
  Chromath.hsva = Chromath.hsv;

  /*
    Constructor: Chromath.hsb
    Alias for <Chromath.hsv>
   */
  Chromath.hsb = Chromath.hsv;

  /*
     Constructor: Chromath.hsba
     Alias for <Chromath.hsva>
   */
  Chromath.hsba = Chromath.hsva;

  // Group: Static methods - representation
  /*
    Method: Chromath.toInteger
    Convert a color into an integer (alpha channel currently omitted)

    Parameters:
    color - Accepts the same arguments as the Chromath constructor

    Returns:
    integer

    Examples:
    > > Chromath.toInteger('green');
    > 32768

    > > Chromath.toInteger('white');
    > 16777215
  */
  Chromath.toInteger = function (color)
  {
      // create something like '008000' (green)
      var hex6 = new Chromath(color).hex().join('');

      // Arguments beginning with `0x` are treated as hex values
      return Number('0x' + hex6);
  };

  /*
    Method: Chromath.toName
    Return the W3C color name of the color it matches

    Parameters:
    comparison

    Examples:
    > > Chromath.toName('rgb(255, 0, 255)');
    > 'fuchsia'

    > > Chromath.toName(65535);
    > 'aqua'
  */
  Chromath.toName = function (comparison)
  {
      comparison = +new Chromath(comparison);
      for (var color in Chromath.colors) if (+Chromath[color] == comparison) return color;
  };

  // Group: Static methods - color conversion
  /*
    Method: Chromath.rgb2hex
    Convert an RGB value to a Hex value

    Returns: array

    Example:
    > > Chromath.rgb2hex(50, 100, 150)
    > "[32, 64, 96]"
   */
  Chromath.rgb2hex = function rgb2hex(r, g, b)
  {
      var rgb = util.rgb.scaled01(r, g, b);
      var hex = rgb.map(function (pct) {
        var dec = Math.round(pct * 255);
        var hex = dec.toString(16).toUpperCase();
        return util.lpad(hex, 2, 0);
      });

      return hex;
  };

  // Converted from http://en.wikipedia.org/wiki/HSL_and_HSV#General_approach
  /*
    Method: Chromath.rgb2hsl
    Convert RGB to HSL

    Parameters:
    r - Number, 0-255, representing the green channel OR Array OR object (with keys r,g,b) of RGB values
    g - Number, 0-255, representing the green channel
    b - Number, 0-255, representing the red channel

    Returns: array

    > > Chromath.rgb2hsl(0, 255, 0);
    > [ 120, 1, 0.5 ]

    > > Chromath.rgb2hsl([0, 0, 255]);
    > [ 240, 1, 0.5 ]

    > > Chromath.rgb2hsl({r: 255, g: 0, b: 0});
    > [ 0, 1, 0.5 ]
   */
  Chromath.rgb2hsl = function rgb2hsl(r, g, b)
  {
      var rgb = util.rgb.scaled01(r, g, b);
      r = rgb[0], g = rgb[1], b = rgb[2];

      var M = Math.max(r, g, b);
      var m = Math.min(r, g, b);
      var C = M - m;
      var L = 0.5*(M + m);
      var S = (C === 0) ? 0 : C/(1-Math.abs(2*L-1));

      var h;
      if (C === 0) h = 0; // spec'd as undefined, but usually set to 0
      else if (M === r) h = ((g-b)/C) % 6;
      else if (M === g) h = ((b-r)/C) + 2;
      else if (M === b) h = ((r-g)/C) + 4;

      var H = 60 * h;

      return [H, parseFloat(S), parseFloat(L)];
  };

  /*
    Method: Chromath.rgb2hsv
    Convert RGB to HSV

    Parameters:
    r - Number, 0-255, representing the green channel OR Array OR object (with keys r,g,b) of RGB values
    g - Number, 0-255, representing the green channel
    b - Number, 0-255, representing the red channel

    Returns:
    Array

    > > Chromath.rgb2hsv(0, 255, 0);
    > [ 120, 1, 1 ]

    > > Chromath.rgb2hsv([0, 0, 255]);
    > [ 240, 1, 1 ]

    > > Chromath.rgb2hsv({r: 255, g: 0, b: 0});
    > [ 0, 1, 1 ]
   */
  Chromath.rgb2hsv = function rgb2hsv(r, g, b)
  {
      var rgb = util.rgb.scaled01(r, g, b);
      r = rgb[0], g = rgb[1], b = rgb[2];

      var M = Math.max(r, g, b);
      var m = Math.min(r, g, b);
      var C = M - m;
      var L = M;
      var S = (C === 0) ? 0 : C/M;

      var h;
      if (C === 0) h = 0; // spec'd as undefined, but usually set to 0
      else if (M === r) h = ((g-b)/C) % 6;
      else if (M === g) h = ((b-r)/C) + 2;
      else if (M === b) h = ((r-g)/C) + 4;

      var H = 60 * h;

      return [H, parseFloat(S), parseFloat(L)];
  };

  /*
     Method: Chromath.rgb2hsb
     Alias for <Chromath.rgb2hsv>
   */
  Chromath.rgb2hsb = Chromath.rgb2hsv;

  /*
    Method: Chromath.hsl2rgb
    Convert from HSL to RGB

    Parameters:
    h - Number, -Infinity - Infinity, representing the hue OR Array OR object (with keys h,s,l) of HSL values
    s - Number, 0-1, representing the saturation
    l - Number, 0-1, representing the lightness

    Returns:
    array

    Examples:
    > > Chromath.hsl2rgb(360, 1, 0.5);
    > [ 255, 0, 0 ]

    > > Chromath.hsl2rgb([0, 1, 0.5]);
    > [ 255, 0, 0 ]

    > > Chromath.hsl2rgb({h: 210, s:1, v: 0.5});
    > [ 0, 127.5, 255 ]
   */
  // TODO: Can I %= hp and then do a switch?
  Chromath.hsl2rgb = function hsl2rgb(h, s, l)
  {
      var hsl = util.hsl.scaled(h, s, l);
      h=hsl[0], s=hsl[1], l=hsl[2];

      var C = (1 - Math.abs(2*l-1)) * s;
      var hp = h/60;
      var X = C * (1-Math.abs(hp%2-1));
      var rgb, m;

      switch (Math.floor(hp)){
      case 0:  rgb = [C,X,0]; break;
      case 1:  rgb = [X,C,0]; break;
      case 2:  rgb = [0,C,X]; break;
      case 3:  rgb = [0,X,C]; break;
      case 4:  rgb = [X,0,C]; break;
      case 5:  rgb = [C,0,X]; break;
      default: rgb = [0,0,0];
      }

      m = l - (C/2);

      return [
          (rgb[0]+m),
          (rgb[1]+m),
          (rgb[2]+m)
      ];
  };

  /*
    Method: Chromath.hsv2rgb
    Convert HSV to RGB

    Parameters:
    h - Number, -Infinity - Infinity, representing the hue OR Array OR object (with keys h,s,v or h,s,b) of HSV values
    s - Number, 0-1, representing the saturation
    v - Number, 0-1, representing the lightness

    Examples:
    > > Chromath.hsv2rgb(360, 1, 1);
    > [ 255, 0, 0 ]

    > > Chromath.hsv2rgb([0, 1, 0.5]);
    > [ 127.5, 0, 0 ]

    > > Chromath.hsv2rgb({h: 210, s: 0.5, v: 1});
    > [ 127.5, 191.25, 255 ]
   */
  Chromath.hsv2rgb = function hsv2rgb(h, s, v)
  {
      var hsv = util.hsl.scaled(h, s, v);
      h=hsv[0], s=hsv[1], v=hsv[2];

      var C = v * s;
      var hp = h/60;
      var X = C*(1-Math.abs(hp%2-1));
      var rgb, m;

      if (h == undefined)         rgb = [0,0,0];
      else if (0 <= hp && hp < 1) rgb = [C,X,0];
      else if (1 <= hp && hp < 2) rgb = [X,C,0];
      else if (2 <= hp && hp < 3) rgb = [0,C,X];
      else if (3 <= hp && hp < 4) rgb = [0,X,C];
      else if (4 <= hp && hp < 5) rgb = [X,0,C];
      else if (5 <= hp && hp < 6) rgb = [C,0,X];

      m = v - C;

      return [
          (rgb[0]+m),
          (rgb[1]+m),
          (rgb[2]+m)
      ];
  };

  /*
     Method: Chromath.hsb2rgb
     Alias for <Chromath.hsv2rgb>
   */
  Chromath.hsb2rgb = Chromath.hsv2rgb;

  /*
      Property: Chromath.convert
      Aliases for the Chromath.x2y functions.
      Use like Chromath.convert[x][y](args) or Chromath.convert.x.y(args)
  */
  Chromath.convert = {
      rgb: {
          hex: Chromath.hsv2rgb,
          hsl: Chromath.rgb2hsl,
          hsv: Chromath.rgb2hsv
      },
      hsl: {
          rgb: Chromath.hsl2rgb
      },
      hsv: {
          rgb: Chromath.hsv2rgb
      }
  };

  /* Group: Static methods - color scheme */
  /*
    Method: Chromath.complement
    Return the complement of the given color

    Returns: <Chromath>

    > > Chromath.complement(new Chromath('red'));
    > { r: 0, g: 255, b: 255, a: 1, h: 180, sl: 1, sv: 1, l: 0.5, v: 1 }

    > > Chromath.complement(new Chromath('red')).toString();
    > '#00FFFF'
   */
  Chromath.complement = function (color)
  {
      var c = new Chromath(color);
      var hsl = c.toHSLObject();

      hsl.h = (hsl.h + 180) % 360;

      return new Chromath(hsl);
  };

  /*
    Method: Chromath.triad
    Create a triad color scheme from the given Chromath.

    Examples:
    > > Chromath.triad(Chromath.yellow)
    > [ { r: 255, g: 255, b: 0, a: 1, h: 60, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 255, b: 255, a: 1, h: 180, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 255, g: 0, b: 255, a: 1, h: 300, sl: 1, sv: 1, l: 0.5, v: 1 } ]

   > > Chromath.triad(Chromath.yellow).toString();
   > '#FFFF00,#00FFFF,#FF00FF'
  */
  Chromath.triad = function (color)
  {
      var c = new Chromath(color);

      return [
          c,
          new Chromath({r: c.b, g: c.r, b: c.g}),
          new Chromath({r: c.g, g: c.b, b: c.r})
      ];
  };

  /*
    Method: Chromath.tetrad
    Create a tetrad color scheme from the given Chromath.

    Examples:
    > > Chromath.tetrad(Chromath.cyan)
    > [ { r: 0, g: 255, b: 255, a: 1, h: 180, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 255, g: 0, b: 255, a: 1, h: 300, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 255, g: 255, b: 0, a: 1, h: 60, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 255, b: 0, a: 1, h: 120, sl: 1, sv: 1, l: 0.5, v: 1 } ]

    > > Chromath.tetrad(Chromath.cyan).toString();
    > '#00FFFF,#FF00FF,#FFFF00,#00FF00'
  */
  Chromath.tetrad = function (color)
  {
      var c = new Chromath(color);

      return [
          c,
          new Chromath({r: c.b, g: c.r, b: c.b}),
          new Chromath({r: c.b, g: c.g, b: c.r}),
          new Chromath({r: c.r, g: c.b, b: c.r})
      ];
  };

  /*
    Method: Chromath.analogous
    Find analogous colors from a given color

    Parameters:
    mixed - Any argument which is passed to <Chromath>
    results - How many colors to return (default = 3)
    slices - How many pieces are in the color wheel (default = 12)

    Examples:
    > > Chromath.analogous(new Chromath('rgb(0, 255, 255)'))
    > [ { r: 0, g: 255, b: 255, a: 1, h: 180, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 255, b: 101, a: 1, h: 144, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 255, b: 153, a: 1, h: 156, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 255, b: 203, a: 1, h: 168, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 255, b: 255, a: 1, h: 180, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 203, b: 255, a: 1, h: 192, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 153, b: 255, a: 1, h: 204, sl: 1, sv: 1, l: 0.5, v: 1 },
    >   { r: 0, g: 101, b: 255, a: 1, h: 216, sl: 1, sv: 1, l: 0.5, v: 1 } ]

    > > Chromath.analogous(new Chromath('rgb(0, 255, 255)')).toString()
    > '#00FFFF,#00FF65,#00FF99,#00FFCB,#00FFFF,#00CBFF,#0099FF,#0065FF'
   */
  Chromath.analogous = function (color, results, slices)
  {
      if (!isFinite(results)) results = 3;
      if (!isFinite(slices)) slices = 12;

      var c = new Chromath(color);
      var hsv = c.toHSVObject();
      var slice = 360 / slices;
      var ret = [ c ];

      hsv.h = ((hsv.h - (slices * results >> 1)) + 720) % 360;
      while (--results) {
          hsv.h = (hsv.h + slice) % 360;
          ret.push(new Chromath(hsv));
      }

      return ret;
  };

  /*
    Method: Chromath.monochromatic
    Return a series of the given color at various lightnesses

    Examples:
    > > Chromath.monochromatic('rgb(0, 100, 255)').forEach(function (c){ console.log(c.toHSVString()); })
    > hsv(216,100%,20%)
    > hsv(216,100%,40%)
    > hsv(216,100%,60%)
    > hsv(216,100%,80%)
    > hsv(216,100%,100%)
  */
  Chromath.monochromatic = function (color, results)
  {
      if (!results) results = 5;

      var c = new Chromath(color);
      var hsv = c.toHSVObject();
      var inc = 1 / results;
      var ret = [], step = 0;

      while (step++ < results) {
          hsv.v = step * inc;
          ret.push(new Chromath(hsv));
      }

      return ret;
  };

  /*
    Method: Chromath.splitcomplement
    Generate a split complement color scheme from the given color

    Examples:
    > > Chromath.splitcomplement('rgb(0, 100, 255)')
    > [ { r: 0, g: 100, b: 255, h: 216.47058823529414, sl: 1, l: 0.5, sv: 1, v: 1, a: 1 },
    >   { r: 255, g: 183, b: 0, h: 43.19999999999999, sl: 1, l: 0.5, sv: 1, v: 1, a: 1 },
    >   { r: 255, g: 73, b: 0, h: 17.279999999999973, sl: 1, l: 0.5, sv: 1, v: 1, a: 1 } ]

    > > Chromath.splitcomplement('rgb(0, 100, 255)').toString()
    > '#0064FF,#FFB700,#FF4900'
   */
  Chromath.splitcomplement = function (color)
  {
      var ref = new Chromath(color);
      var hsv = ref.toHSVObject();

      var a = new Chromath.hsv({
          h: (hsv.h + 150) % 360,
          s: hsv.s,
          v: hsv.v
      });

      var b = new Chromath.hsv({
          h: (hsv.h + 210) % 360,
          s: hsv.s,
          v: hsv.v
      });

      return [ref, a, b];
  };

  //Group: Static methods - color alteration
  /*
    Method: Chromath.tint
    Lighten a color by adding a percentage of white to it

    Returns <Chromath>

    > > Chromath.tint('rgb(0, 100, 255)', 0.5).toRGBString();
    > 'rgb(127,177,255)'
  */
  Chromath.tint = function ( from, by )
  {
      return Chromath.towards( from, '#FFFFFF', by );
  };

  /*
     Method: Chromath.lighten
     Alias for <Chromath.tint>
  */
  Chromath.lighten = Chromath.tint;

  /*
    Method: Chromath.shade
    Darken a color by adding a percentage of black to it

    Example:
    > > Chromath.darken('rgb(0, 100, 255)', 0.5).toRGBString();
    > 'rgb(0,50,127)'
   */
  Chromath.shade = function ( from, by )
  {
      return Chromath.towards( from, '#000000', by );
  };

  /*
     Method: Chromath.darken
     Alias for <Chromath.shade>
   */
  Chromath.darken = Chromath.shade;

  /*
    Method: Chromath.desaturate
    Desaturate a color using any of 3 approaches

    Parameters:
    color - any argument accepted by the <Chromath> constructor
    formula - The formula to use (from <xarg's greyfilter at http://www.xarg.org/project/jquery-color-plugin-xcolor>)
    - 1 - xarg's own formula
    - 2 - Sun's formula: (1 - avg) / (100 / 35) + avg)
    - empty - The oft-seen 30% red, 59% green, 11% blue formula

    Examples:
    > > Chromath.desaturate('red').toString()
    > "#4C4C4C"

    > > Chromath.desaturate('red', 1).toString()
    > "#373737"

    > > Chromath.desaturate('red', 2).toString()
    > "#909090"
  */
  Chromath.desaturate = function (color, formula)
  {
      var c = new Chromath(color), rgb, avg;

      switch (formula) {
      case 1: // xarg's formula
          avg = .35 + 13 * (c.r + c.g + c.b) / 60; break;
      case 2: // Sun's formula: (1 - avg) / (100 / 35) + avg)
          avg = (13 * (c.r + c.g + c.b) + 5355) / 60; break;
      default:
          avg = c.r * .3 + c.g * .59 + c.b * .11;
      }

      avg = util.clamp(avg, 0, 255);
      rgb = {r: avg, g: avg, b: avg};

      return new Chromath(rgb);
  };

  /*
    Method: Chromath.greyscale
    Alias for <Chromath.desaturate>
  */
  Chromath.greyscale = Chromath.desaturate;

  /*
    Method: Chromath.websafe
    Convert a color to one of the 216 "websafe" colors

    Examples:
    > > Chromath.websafe('#ABCDEF').toString()
    > '#99CCFF'

    > > Chromath.websafe('#BBCDEF').toString()
    > '#CCCCFF'
   */
  Chromath.websafe = function (color)
  {
      color = new Chromath(color);

      color.r = Math.round(color.r / 51) * 51;
      color.g = Math.round(color.g / 51) * 51;
      color.b = Math.round(color.b / 51) * 51;

      return new Chromath(color);
  };

  //Group: Static methods - color combination
  /*
    Method: Chromath.additive
    Combine any number colors using additive color

    Examples:
    > > Chromath.additive('#F00', '#0F0').toString();
    > '#FFFF00'

    > > Chromath.additive('#F00', '#0F0').toString() == Chromath.yellow.toString();
    > true

    > > Chromath.additive('red', '#0F0', 'rgb(0, 0, 255)').toString() == Chromath.white.toString();
    > true
   */
  Chromath.additive = function ()
  {
      var args = arguments.length-2, i=-1, a, b;
      while (i++ < args){

          a = a || new Chromath(arguments[i]);
          b = new Chromath(arguments[i+1]);

          if ((a.r += b.r) > 255) a.r = 255;
          if ((a.g += b.g) > 255) a.g = 255;
          if ((a.b += b.b) > 255) a.b = 255;

          a = new Chromath(a);
      }

      return a;
  };

  /*
    Method: Chromath.subtractive
    Combine any number of colors using subtractive color

    Examples:
    > > Chromath.subtractive('yellow', 'magenta').toString();
    > '#FF0000'

    > > Chromath.subtractive('yellow', 'magenta').toString() === Chromath.red.toString();
    > true

    > > Chromath.subtractive('cyan', 'magenta', 'yellow').toString();
    > '#000000'

    > > Chromath.subtractive('red', '#0F0', 'rgb(0, 0, 255)').toString();
    > '#000000'
  */
  Chromath.subtractive = function ()
  {
      var args = arguments.length-2, i=-1, a, b;
      while (i++ < args){

          a = a || new Chromath(arguments[i]);
          b = new Chromath(arguments[i+1]);

          if ((a.r += b.r - 255) < 0) a.r = 0;
          if ((a.g += b.g - 255) < 0) a.g = 0;
          if ((a.b += b.b - 255) < 0) a.b = 0;

          a = new Chromath(a);
      }

      return a;
  };

  /*
    Method: Chromath.multiply
    Multiply any number of colors

    Examples:
    > > Chromath.multiply(Chromath.lightgoldenrodyellow, Chromath.lightblue).toString();
    > "#A9D3BD"

    > > Chromath.multiply(Chromath.oldlace, Chromath.lightblue, Chromath.darkblue).toString();
    > "#000070"
  */
  Chromath.multiply = function ()
  {
      var args = arguments.length-2, i=-1, a, b;
      while (i++ < args){

          a = a || new Chromath(arguments[i]);
          b = new Chromath(arguments[i+1]);

          a.r = (a.r / 255 * b.r)|0;
          a.g = (a.g / 255 * b.g)|0;
          a.b = (a.b / 255 * b.b)|0;

          a = new Chromath(a);
      }

      return a;
  };

  /*
    Method: Chromath.average
    Averages any number of colors

    Examples:
    > > Chromath.average(Chromath.lightgoldenrodyellow, Chromath.lightblue).toString()
    > "#D3E9DC"

    > > Chromath.average(Chromath.oldlace, Chromath.lightblue, Chromath.darkblue).toString()
    > "#6A73B8"
   */
  Chromath.average = function ()
  {
      var args = arguments.length-2, i=-1, a, b;
      while (i++ < args){

          a = a || new Chromath(arguments[i]);
          b = new Chromath(arguments[i+1]);

          a.r = (a.r + b.r) >> 1;
          a.g = (a.g + b.g) >> 1;
          a.b = (a.b + b.b) >> 1;

          a = new Chromath(a);
      }

      return a;
  };

  /*
    Method: Chromath.overlay
    Add one color on top of another with a given transparency

    Examples:
    > > Chromath.average(Chromath.lightgoldenrodyellow, Chromath.lightblue).toString()
    > "#D3E9DC"

    > > Chromath.average(Chromath.oldlace, Chromath.lightblue, Chromath.darkblue).toString()
    > "#6A73B8"
   */
  Chromath.overlay = function (top, bottom, opacity)
  {
      var a = new Chromath(top);
      var b = new Chromath(bottom);

      if (opacity > 1) opacity /= 100;
      opacity = util.clamp(opacity - 1 + b.a, 0, 1);

      return new Chromath({
          r: util.lerp(a.r, b.r, opacity),
          g: util.lerp(a.g, b.g, opacity),
          b: util.lerp(a.b, b.b, opacity)
      });
  };


  //Group: Static methods - other
  /*
    Method: Chromath.towards
    Move from one color towards another by the given percentage (0-1, 0-100)

    Parameters:
    from - The starting color
    to - The destination color
    by - The percentage, expressed as a floating number between 0 and 1, to move towards the destination color
    interpolator - The function to use for interpolating between the two points. Defaults to Linear Interpolation. Function has the signature `(from, to, by)` with the parameters having the same meaning as those in `towards`.

    > > Chromath.towards('red', 'yellow', 0.5).toString()
    > "#FF7F00"
  */
  Chromath.towards = function (from, to, by, interpolator)
  {
      if (!to) { return from; }
      if (!isFinite(by))
          throw new Error('TypeError: `by`(' + by  +') should be between 0 and 1');
      if (!(from instanceof Chromath)) from = new Chromath(from);
      if (!(to instanceof Chromath)) to = new Chromath(to || '#FFFFFF');
      if (!interpolator) interpolator = util.lerp;
      by = parseFloat(by);

      return new Chromath({
          r: interpolator(from.r, to.r, by),
          g: interpolator(from.g, to.g, by),
          b: interpolator(from.b, to.b, by),
          a: interpolator(from.a, to.a, by)
      });
  };

  /*
    Method: Chromath.gradient
    Create an array of Chromath objects

    Parameters:
    from - The beginning color of the gradient
    to - The end color of the gradient
    slices - The number of colors in the array
    slice - The color at a specific, 1-based, slice index

    Examples:
    > > Chromath.gradient('red', 'yellow').length;
    > 20

    > > Chromath.gradient('red', 'yellow', 5).toString();
    > "#FF0000,#FF3F00,#FF7F00,#FFBF00,#FFFF00"

    > > Chromath.gradient('red', 'yellow', 5, 2).toString();
    > "#FF7F00"

    > > Chromath.gradient('red', 'yellow', 5)[2].toString();
    > "#FF7F00"
   */
  Chromath.gradient = function (from, to, slices, slice)
  {
      var gradient = [], stops;

      if (! slices) slices = 20;
      stops = (slices-1);

      if (isFinite(slice)) return Chromath.towards(from, to, slice/stops);
      else slice = -1;

      while (++slice < slices){
          gradient.push(Chromath.towards(from, to, slice/stops));
      }

      return gradient;
  };

  /*
    Method: Chromath.parse
    Iterate through the objects set in Chromath.parsers and, if a match is made, return the value specified by the matching parsers `process` function

    Parameters:
    string - The string to parse

    Example:
    > > Chromath.parse('rgb(0, 128, 255)')
    > { r: 0, g: 128, b: 255, a: undefined }
   */
  Chromath.parse = function (string)
  {
      var parsers = Chromath.parsers, i, l, parser, parts, channels;

      for (i = 0, l = parsers.length; i < l; i++) {
          parser = parsers[i];
          parts = parser.regex.exec(string);
          if (parts && parts.length) channels = parser.process.apply(this, parts);
          if (channels) return channels;
      }
  };

  return Chromath;
};
