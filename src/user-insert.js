import { LitElement, html, css } from 'lit-element';
import 'dile-input/dile-input';

class UserInsert extends LitElement {

  /**
    * Object describing property-related metadata used by Polymer features
    */
  static get properties() {
    return {
      user: { type: Object },
    };
  }
  constructor() {
    super();
    this.user = {
      first: 'Miguel',
      last: 'Alvarez',
      born: '1975'
    }
  }
  
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 15px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        text-transform: uppercase;
      }
    `;
  }
  render() {
    return html`
      <dile-input value="${this.user.first}" label="Nombre" name="first" @input="${this.inputChanged}"></dile-input>
      <dile-input value="${this.user.last}" label="Apellido" name="last" @input="${this.inputChanged}"></dile-input>
      <dile-input value="${this.user.born}" label="Año de nacimiento" name="born" @input="${this.inputChanged}"></dile-input>
      <a href="#" @click="${this.insert}">Insertar</a>
    `;
  }

  inputChanged(e) {
    this.user[e.target.name] = e.target.value;
  }
  insert(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('user-insert', {
      detail: this.user
    }));
  }
}
customElements.define('user-insert', UserInsert);