# LitX

Combining the powers of [lit-html](https://github.com/PolymerLabs/lit-html) and [MobX](https://mobx.js.org) to provide a light weight standard [custom element]() based alternative to Polymer.

**Note: This is currently just a work in progress!**

### Setup

Assuming you have already installed a current version of [node.js](https://nodejs.org):

    npm install

Note: Remember to run this again whenever `package-lock.json` is changed.

### Lint

To lint the JavaScript:

    npm run lint

### Build

TODO: Use rollup or webpack to build (e.g: Babel) src and test ES next code so it can be executed in supported browsers.

Until that time I guess I'll have to stick to what's supported by Chrome (e.g: no decorates or class properties).

    TODO: npm run build

### Test

For now there will only be a little playground `test.html` file providing a minimalistic test page to be opened in your browser, e.g: (assuming you have globally installed [live-server](https://www.npmjs.com/package/live-server))

    live-server

And then open: http://127.0.0.1:8080/test/test.html

**TODO: Use [web-component-tester](https://github.com/Polymer/web-component-tester) or something similar to implement tests**
