Set and get Caret position (contenteditable or TextArea) using Vanilla JavaScript
====================

[![NPM version][npm-version-image]][npm-url]
[![NPM size][npm-size-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Donate][donate-image]][paypal-link]
[![MIT License][license-image]][license-url]

# Demo
[![Demo](https://media.giphy.com/media/fndxOJjHJMvZqWEJBT/giphy.gif)](http://abhas9.github.io/vanilla-caret-js)


# Setup
```shell
$ npm i vanilla-caret-js
const VanillaCaret = require('vanilla-caret-js');
```
OR
```javascript
<script src="https://cdn.jsdelivr.net/npm/vanilla-caret-js@1.0.1/dist/VanillaCaret.min.js"></script>
```
# Example Usage

```javascript
var caret = new VanillaCaret(document.getElementById('root')); // Initialize
caret.setPos(4); // Set
document.getElementById('currentPosition').value = caret.getPos(); // Get
```

# Development

Once you've downloaded the files in this repo please run the following command in your terminal from the project folder (it may require `sudo`):

```shell
$ npm install
```

## Available tasks

### Build and test
```shell
$ node make # or also `$ npm run default`
```

### Convert the ES6 code into valid ES5 combining all the modules into one single file
```shell
$ node make build # or also `$ npm run build`
```

### Start a nodejs static server
```shell
$ node make serve # or also `$ npm run serve`
```

[license-url]: LICENSE
[license-image]: http://img.shields.io/badge/license-MIT-000000.svg?style=flat-square

[paypal-link]:https://www.paypal.me/abhas9
[donate-image]:https://img.shields.io/badge/donate-%E2%9D%A4-brightgreen.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/vanilla-caret-js
[npm-version-image]: http://img.shields.io/npm/v/vanilla-caret-js.svg?style=flat-square
[npm-size-image]: https://img.shields.io/bundlephobia/min/vanilla-caret-js.svg?style=flat-square

[travis-url]:https://travis-ci.org/abhas9/vanilla-caret-js
[travis-image]: https://api.travis-ci.org/abhas9/vanilla-caret-js.svg?branch=master&style=flat-square



