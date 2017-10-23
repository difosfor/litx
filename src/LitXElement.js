// Note: We use lit-extended to enable passing non-string values to child elements as properties, e.g: <foo a=${1}>.
// To pass attributes to child elements append $ to the attribute name, e.g: <foo class$="bar">.
// To add event listeners to elements use the on- attribute prefix, e.g: <foo on-click=${this.onClick}>
import {html, render} from '../node_modules/lit-html/lib/lit-extended.js';
import {extendObservable, autorun} from '../node_modules/mobx/lib/mobx.module.js';

class LitXElement extends HTMLElement {
  // Override this with specific attributes in extending classes
  static get observedAttributes() {
    return [];
  }

  constructor({
    shadow = true,
  } = {}) {
    super();

    this.disposers = [];

    this.root = shadow ? this.attachShadow({mode: 'open'}) : this;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log(`${attr}: ${oldValue} => ${newValue}`);

    this[attr] = newValue;
  }

  autorun(callback) {
    this.disposers.push(autorun(callback));
  }

  connectedCallback() {
    console.log('connectedCallback', this);

    // Attribute <-> observable property binding
    for (let attr of this.constructor.observedAttributes) {
      // Note: camelCase attribute names seem to work to a large extent thanks to lit-html
      extendObservable(this, {[attr]: this.getAttribute(attr)});

      this.autorun(() => {
        const value = this[attr];
        if (this.getAttribute(attr) === value) {
          return;
        }
        if (value === null) {
          this.removeAttribute(attr);
        } else {
          this.setAttribute(attr, value);
        }
      });
    }

    // Observable property based automatic rendering using lit-html based DOM binding
    this.autorun(
      () => render(this.render(), this.root)
    );
  }

  disconnectedCallback() {
    console.log('disconnectedCallback', this);
    for (let dispose of this.disposers) {
      dispose();
    }
    this.disposers.length = 0;
  }

  // Override this with specific template in extending classes
  render() {
    return html``;
  }
}

export default LitXElement;
