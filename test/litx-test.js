import {html} from '../node_modules/lit-html/lit-html.js';
import {extendObservable} from '../node_modules/mobx/lib/mobx.module.js';
import LitXElement from '../src/LitXElement.js';

class LitxTest extends LitXElement {
  static get observedAttributes() {
    return [
      'color',
      'foo',
      'fooBar'
    ];
  }

  constructor() {
    super({
      // shadow: false,
    });

    extendObservable(this, {
      counter: 0
    });

    console.log('this childNodes', this.childNodes);
  }

  render() {
    console.log('render', this);

    // TODO: Figure out how to use attribute property expressions in CSS, e.g: background: ${this.color};
    return html`
      <style>
        /* Shadow root CSS */
        :host {
          display: block;
        }
        label {
          display: inline-block;
          font-weight: bold;
          width: 70px;
        }
      </style>

      <!-- Attribute property expression in HTML -->
      <label>foo:</label> ${this.foo}<br>

      <!-- Camel case attribute property expression and event listener -->
      <label>fooBar:</label> <input type="text" value$="${this.fooBar}" on-input="${(e) => this.onFooBarInput(e)}"><br>

      <!-- Basic property expression and event listener -->
      <label>counter:</label> ${this.counter} <button on-click="${() => this.counter++}">+</button><br>

      <!-- Include any content passed to this element -->
      <!-- TODO: Make this work dynamically, e.g: using this.childNodes? (also have it not break without Shadow DOM) -->
      <label>content:</label> ${html([this.innerHTML])}<br>
    `;
  }

  onFooBarInput(e) {
    this.fooBar = e.target.value;
  }
}

customElements.define('litx-test', LitxTest);

export default LitxTest;