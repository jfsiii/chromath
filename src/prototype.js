module.exports = function ChromathPrototype(Chromath) {
  return {
      /*
         Method: toName
         Call <Chromath.toName> on the current instance
         > > var color = new Chromath('rgb(173, 216, 230)');
         > > color.toName();
         > "lightblue"
      */
      toName: function (){ return Chromath.toName(this); },

      /*
         Method: toString
         Display the instance as a string. Defaults to <Chromath.toHexString>
         > > var color = Chromath.rgb(56, 78, 90);
         > > Color.toHexString();
         > "#384E5A"
      */
      toString: function (){ return this.toHexString(); },

      /*
         Method: valueOf
         Display the instance as an integer. Defaults to <Chromath.toInteger>
         > > var yellow = new Chromath('yellow');
         > > yellow.valueOf();
         > 16776960
         > > +yellow
         > 16776960
      */
      valueOf: function (){ return Chromath.toInteger(this); },

    /*
       Method: rgb
       Return the RGB array of the instance
       > > new Chromath('red').rgb();
       > [255, 0, 0]
    */
      rgb: function (){ return this.toRGBArray(); },

      /*
         Method: toRGBArray
         Return the RGB array of the instance
         > > Chromath.burlywood.toRGBArray();
         > [255, 184, 135]
      */
      toRGBArray: function (){ return this.toRGBAArray().slice(0,3); },

      /*
         Method: toRGBObject
         Return the RGB object of the instance
         > > new Chromath('burlywood').toRGBObject();
         > {r: 255, g: 184, b: 135}
      */
      toRGBObject: function ()
      {
          var rgb = this.toRGBArray();

          return {r: rgb[0], g: rgb[1], b: rgb[2]};
      },

      /*
         Method: toRGBString
         Return the RGB string of the instance
         > > new Chromath('aliceblue').toRGBString();
         > "rgb(240,248,255)"
      */
      toRGBString: function ()
      {
          return "rgb("+ this.toRGBArray().join(",") +")";
      },

      /*
         Method: rgba
         Return the RGBA array of the instance
         > > new Chromath('red').rgba();
         > [255, 0, 0, 1]
      */
      rgba: function (){ return this.toRGBAArray(); },

      /*
         Method: toRGBAArray
         Return the RGBA array of the instance
         > > Chromath.lime.toRGBAArray();
         > [0, 255, 0, 1]
      */
      toRGBAArray: function ()
      {
          var rgba = [
              Math.round(this.r*255),
              Math.round(this.g*255),
              Math.round(this.b*255),
              parseFloat(this.a)
          ];

          return rgba;
      },

      /*
         Method: toRGBAObject
         Return the RGBA object of the instance
         > > Chromath.cadetblue.toRGBAObject();
         > {r: 95, g: 158, b: 160}
      */
      toRGBAObject: function ()
      {
          var rgba = this.toRGBAArray();

          return {r: rgba[0], g: rgba[1], b: rgba[2], a: rgba[3]};
      },

      /*
         Method: toRGBAString
         Return the RGBA string of the instance
         > > new Chromath('darkblue').toRGBAString();
         > "rgba(0,0,139,1)"
      */
      toRGBAString: function (){
          return "rgba("+ this.toRGBAArray().join(",") +")";
      },

      /*
         Method: hex
         Return the hex array of the instance
         > new Chromath('darkgreen').hex()
         [ '00', '64', '00' ]
      */
      hex: function (){ return this.toHexArray(); },

      /*
        Method: toHexArray
         Return the hex array of the instance
        > > Chromath.firebrick.toHexArray();
        > ["B2", "22", "22"]
      */
      toHexArray: function (){
          return Chromath.rgb2hex(this.r, this.g, this.b);
      },

      /*
         Method: toHexObject
         Return the hex object of the instance
         > > Chromath.gainsboro.toHexObject();
         > {r: "DC", g: "DC", b: "DC"}
      */
      toHexObject: function ()
      {
          var hex = this.toHexArray();

          return { r: hex[0], g: hex[1], b: hex[2] };
      },

      /*
        Method: toHexString
         Return the hex string of the instance
        > > Chromath.honeydew.toHexString();
        > "#F0FFF0"
      */
      toHexString: function (){
          var hex = this.toHexArray();

          return '#' + hex.join('');
      },

      /*
         Method: hsl
         Return the HSL array of the instance
         > >new Chromath('green').hsl();
         > [120, 1, 0.25098039215686274]
      */
      hsl: function (){ return this.toHSLArray(); },

      /*
         Method: toHSLArray
         Return the HSL array of the instance
         > > new Chromath('red').toHSLArray();
         > [0, 1, 0.5]
      */
      toHSLArray: function (){
          return this.toHSLAArray().slice(0,3);
      },

      /*
         Method: toHSLObject
         Return the HSL object of the instance
         > > new Chromath('red').toHSLObject();
         [h:0, s:1, l:0.5]
      */
      toHSLObject: function ()
      {
          var hsl = this.toHSLArray();

          return {h: hsl[0], s: hsl[1], l: hsl[2]};
      },

      /*
         Method: toHSLString
         Return the HSL string of the instance
         > > new Chromath('red').toHSLString();
         > "hsl(0,1,0.5)"
      */
      toHSLString: function (){
          var hsla = this.toHSLAArray();
          var vals = [
              hsla[0],
              Math.round(hsla[1]*100)+'%',
              Math.round(hsla[2]*100)+'%'
          ];

          return 'hsl('+ vals +')';
      },

      /*
        Method: hsla
        Return the HSLA array of the instance
        > > new Chromath('green').hsla();
        > [120, 1, 0.25098039215686274, 1]
      */
      hsla: function (){ return this.toHSLAArray(); },

      /*
         Method: toHSLArray
         Return the HSLA array of the instance
         > > Chromath.antiquewhite.toHSLAArray();
         > [34, 0.7777777777777773, 0.9117647058823529, 1]
      */
      toHSLAArray: function ()
      {
          return [
              Math.round(this.h),
              parseFloat(this.sl),
              parseFloat(this.l),
              parseFloat(this.a)
          ];
      },

      /*
         Method: toHSLAObject
         Return the HSLA object of the instance
         > > Chromath.antiquewhite.toHSLAArray();
         > {h:34, s:0.7777777777777773, l:0.9117647058823529, a:1}
      */
      toHSLAObject: function ()
      {
          var hsla = this.toHSLAArray();

          return {h: hsla[0], s: hsla[1], l: hsla[2], a: hsla[3]};
      },

      /*
         Method: toHSLAString
         Return the HSLA string of the instance
         > > Chromath.antiquewhite.toHSLAString();
         > "hsla(34,0.7777777777777773,0.9117647058823529,1)"
      */
      toHSLAString: function (){
          var hsla = this.toHSLAArray();
          var vals = [
              hsla[0],
              Math.round(hsla[1]*100)+'%',
              Math.round(hsla[2]*100)+'%',
              Math.round(hsla[3])
          ];

          return 'hsla('+ vals +')';
      },

      /*
         Method: hsv
         Return the HSV array of the instance
         > > new Chromath('blue').hsv();
         > [240, 1, 1]
      */
      hsv: function (){ return this.toHSVArray(); },

      /*
         Method: toHSVArray
         Return the HSV array of the instance
         > > new Chromath('navajowhite').toHSVArray();
         > [36, 0.32156862745098036, 1]
      */
      toHSVArray: function ()
      {
          return this.toHSVAArray().slice(0,3);
      },

      /*
         Method: toHSVObject
         Return the HSV object of the instance
         > > new Chromath('navajowhite').toHSVObject();
         > {h36, s:0.32156862745098036, v:1}
      */
      toHSVObject: function ()
      {
          var hsva = this.toHSVAArray();

          return {h: hsva[0], s: hsva[1], v: hsva[2]};
      },

      /*
         Method: toHSVString
         Return the HSV string of the instance
         > > new Chromath('navajowhite').toHSVString();
         > "hsv(36,32.15686274509804%,100%)"
      */
      toHSVString: function ()
      {
          var hsv = this.toHSVArray();
          var vals = [
              hsv[0],
              Math.round(hsv[1]*100)+'%',
              Math.round(hsv[2]*100)+'%'
          ];

          return 'hsv('+ vals +')';
      },

      /*
         Method: hsva
         Return the HSVA array of the instance
         > > new Chromath('blue').hsva();
         > [240, 1, 1, 1]
      */
      hsva: function (){ return this.toHSVAArray(); },

      /*
         Method: toHSVAArray
         Return the HSVA array of the instance
         > > new Chromath('olive').toHSVAArray();
         > [60, 1, 0.5019607843137255, 1]
      */
      toHSVAArray: function (){
          return [
              Math.round(this.h),
              parseFloat(this.sv),
              parseFloat(this.v),
              parseFloat(this.a)
          ];
      },

      /*
         Method: toHSVAObject
         Return the HSVA object of the instance
         > > new Chromath('olive').toHSVAArray();
         > {h:60, s: 1, v:0.5019607843137255, a:1}
      */
      toHSVAObject: function (){
          var hsva = this.toHSVAArray();

          return {h: hsva[0], s: hsva[1], l: hsva[2], a: hsva[3]};
      },

      /*
         Method: toHSVAString
         Return the HSVA string of the instance
         > > new Chromath('olive').toHSVAString();
         > "hsva(60,100%,50.19607843137255%,1)"
      */
      toHSVAString: function ()
      {
          var hsva = this.toHSVAArray();
          var vals = [
              hsva[0],
              Math.round(hsva[1]*100)+'%',
              Math.round(hsva[2]*100)+'%',
              hsva[3]
          ];

          return 'hsva('+ vals +')';
      },

      /*
         Method: hsb
         Alias for <hsv>
      */
      hsb: function (){ return this.hsv(); },

      /*
         Method: toHSBArray
         Alias for <toHSBArray>
      */
      toHSBArray: function ()
      {
          return this.toHSVArray();
      },

      /*
         Method: toHSBObject
         Alias for <toHSVObject>
      */
      toHSBObject: function ()
      {
          return this.toHSVObject();
      },

      /*
         Method: toHSBString
         Alias for <toHSVString>
      */
      toHSBString: function ()
      {
          return this.toHSVString();
      },

      /*
         Method: hsba
         Alias for <hsva>
      */
      hsba: function (){ return this.hsva(); },

      /*
         Method: toHSBAArray
         Alias for <toHSVAArray>
      */
      toHSBAArray: function (){
          return this.toHSVAArray();
      },

      /*
         Method: toHSBAObject
         Alias for <toHSVAObject>
      */
      toHSBAObject: function (){
          return this.toHSVAObject();
      },

      /*
         Method: toHSBAString
         Alias for <toHSVAString>
      */
      toHSBAString: function ()
      {
          return this.toHSVAString();
      },

      //Group: Instance methods - color scheme
      /*
         Method: complement
         Calls <Chromath.complement> with the current instance as the first parameter

         > > Chromath.red.complement().rgb();
         > [0, 255, 255]
      */
      complement: function (){
          return Chromath.complement(this);
      },

      /*
         Method: triad
         Calls <Chromath.triad> with the current instance as the first parameter

         > > new Chromath('hsl(0, 100%, 50%)').triad().toString();
         > "#FF0000,#00FF00,#0000FF"
      */
      triad: function (){
          return Chromath.triad(this);
      },

      /*
         Method: tetrad
         Calls <Chromath.tetrad> with the current instance as the first parameter

         > > Chromath.hsb(240, 1, 1).triad();
         > [Chromath, Chromath, Chromath]
      */
      tetrad: function (){
          return Chromath.tetrad(this);
      },

      /*
         Method: analogous
         Calls <Chromath.analogous> with the current instance as the first parameter

         > > Chromath.hsb(120, 1, 1).analogous();
         > [Chromath, Chromath, Chromath, Chromath, Chromath, Chromath, Chromath, Chromath]

         > > Chromath.hsb(180, 1, 1).analogous(5).toString();
         > "#00FFFF,#00FFB2,#00FFE5,#00E5FF,#00B2FF"

         > > Chromath.hsb(180, 1, 1).analogous(5, 10).toString();
         > "#00FFFF,#00FF19,#00FFB2,#00B2FF,#0019FF"
      */
      analogous: function (results, slices){
          return Chromath.analogous(this, results, slices);
      },

      /*
        Method: monochromatic
         Calls <Chromath.monochromatic> with the current instance as the first parameter

        > > Chromath.blue.monochromatic().toString();
        > "#000033,#000066,#000099,#0000CC,#0000FF"
      */
      monochromatic: function (results){
          return Chromath.monochromatic(this, results);
      },

      /*
         Method: splitcomplement
         Calls <Chromath.splitcomplement> with the current instance as the first parameter

         > > Chromath.blue.splitcomplement().toString();
         > "#0000FF,#FFCC00,#FF5100"
      */
      splitcomplement: function (){
          return Chromath.splitcomplement(this);
      },

      // Group: Instance methods - color alteration
      /*
         Method: tint
         Calls <Chromath.tint> with the current instance as the first parameter

         > > new Chromath('yellow').tint(0.25).toString();
         > "#FFFF3F"
      */
      tint: function (by) {
          return Chromath.tint(this, by);
      },

      /*
         Method: lighten
         Alias for <tint>
      */
      lighten: function (by) {
        return this.tint(by);
      },

      /*
        Method: shade
         Calls <Chromath.shade> with the current instance as the first parameter

        > > new Chromath('yellow').shade(0.25).toString();
        > "#BFBF00"
      */
      shade: function (by) {
          return Chromath.shade(this, by);
      },

      /*
         Method: darken
         Alias for <shade>
      */
      darken: function (by) {
        return this.shade(by);
      },

      /*
         Method: desaturate
         Calls <Chromath.desaturate> with the current instance as the first parameter

       > > new Chromath('orange').desaturate().toString();
       > "#ADADAD"

       > > new Chromath('orange').desaturate(1).toString();
       > "#5B5B5B"

       > > new Chromath('orange').desaturate(2).toString();
       > "#B4B4B4"
       */
      desaturate: function (formula){
          return Chromath.desaturate(this, formula);
      },

      /*
        Method: greyscale
        Alias for <desaturate>
      */
      greyscale: function (formula) {
        return this.desaturate(formula);
      },

      /*
         Method: websafe
         Calls <Chromath.websafe> with the current instance as the first parameter

         > > Chromath.rgb(123, 234, 56).toString();
         > "#7BEA38"

         > Chromath.rgb(123, 234, 56).websafe().toString();
         > "#66FF33"
       */
      websafe: function (){
          return Chromath.websafe(this);
      },

      // Group: Instance methods - color combination
      /*
         Method: additive
         Calls <Chromath.additive> with the current instance as the first parameter

         > > new Chromath('red').additive('#00FF00', 'blue').toString();
         > "#FFFFFF"
      */
      additive: function (){
          var arr = Array.prototype.slice.call(arguments);
          return Chromath.additive.apply(Chromath, [this].concat(arr));
      },

      /*
         Method: subtractive
         Calls <Chromath.subtractive> with the current instance as the first parameter

         > > new Chromath('cyan').subtractive('magenta', 'yellow').toString();
         > "#000000"
      */
      subtractive: function (){
          var arr = Array.prototype.slice.call(arguments);
          return Chromath.subtractive.apply(Chromath, [this].concat(arr));
      },

      /*
         Method: multiply
         Calls <Chromath.multiply> with the current instance as the first parameter

         > > Chromath.lightcyan.multiply(Chromath.brown).toString();
         > "#902A2A"
      */
      multiply: function (){
          var arr = Array.prototype.slice.call(arguments);
          return Chromath.multiply.apply(Chromath, [this].concat(arr));
      },

      /*
         Method: average
         Calls <Chromath.average> with the current instance as the first parameter

         > > Chromath.black.average('white').rgb();
         > [127, 127, 127]
      */
      average: function (){
          var arr = Array.prototype.slice.call(arguments);
          return Chromath.average.apply(Chromath, [this].concat(arr));
      },

      /*
         Method: overlay
         Calls <Chromath.overlay> with the current instance as the first parameter

       > > Chromath.red.overlay('green', 0.4).toString();
       > "#993300"

       > > Chromath.red.overlay('green', 1).toString();
       > "#008000"

       > > Chromath.red.overlay('green', 0).toString();
       > "#FF0000"
       */
      overlay: function (bottom, transparency){
          return Chromath.overlay(this, bottom, transparency);
      },

      // Group: Instance methods - other
      /*
         Method: clone
         Return an independent copy of the instance
      */
      clone: function (){
          return new Chromath(this);
      },

      /*
         Method: towards
         Calls <Chromath.towards> with the current instance as the first parameter

         > > var red = new Chromath('red');
         > > red.towards('yellow', 0.55).toString();
         > "#FF8C00"
      */
      towards: function (to, by) {
          return Chromath.towards(this, to, by);
      },

      /*
         Method: gradient
         Calls <Chromath.gradient> with the current instance as the first parameter

         > > new Chromath('#F00').gradient('#00F').toString()
         > "#FF0000,#F1000D,#E4001A,#D60028,#C90035,#BB0043,#AE0050,#A1005D,#93006B,#860078,#780086,#6B0093,#5D00A1,#5000AE,#4300BB,#3500C9,#2800D6,#1A00E4,#0D00F1,#0000FF"

         > > new Chromath('#F00').gradient('#00F', 5).toString()
         > "#FF0000,#BF003F,#7F007F,#3F00BF,#0000FF"

         > > new Chromath('#F00').gradient('#00F', 5, 3).toString()
         > "#3F00BF"
      */
      gradient: function (to, slices, slice){
          return Chromath.gradient(this, to, slices, slice);
      }
  };
};
