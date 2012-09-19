# chromath

## Overview

  chromath provides provides many color conversion and manipulation functions.

## Getting started
  In the browser:

    <script src="/path/to/chromath.js"></script>

  In NodeJS:

    npm install chromath

  then

    var Chromath = require('/path/to/chromath')

  From there, the usage is identical in both environments.

## Functional or Object-oriented
  You can use chromath in a functional or object-oriented manner.

    var red = new Chromath('rgb(255, 0, 0)');
    red.towards('yellow', 0.5).toString(); // #FF7F00

  is the same as

    Chromath.towards('red', 'yellow', 0.5).toString(); // #FF7F00

  The only difference between instance methods and Class methods with
  the same name (e.g, `Chromath.tint` and `tint`) is that the instance
  methods pass the instance value as the first argument.

  Here's the definition of Chromath.prototype.tint:

    tint: function (by) {
        return Chromath.tint(this, by);
    }

  In NodeJS you can only pull in the portions you're interesed in,
  e.g:

    > var convertRGBtoHex = require('chromath').rgb2hex
    > convertRGBtoHex(234, 56, 78)
    '#EA384E'

## Documentation
  <http://JFSIII.org/project/colorjs/docs/>
