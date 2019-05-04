import { LitElement, html, css } from 'lit-element';
import 'dile-input/dile-input';
import './user-form';
import { userFormMixin } from './user-form-mixin';
import '../eit-button';

class UserInsert extends userFormMixin(LitElement) {

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
        margin-bottom: 20px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 25px;
      }
    `;
  }
  render() {
    return html`
      <user-form .user="${this.user}" @user-changed="${this.onUserChanged}"></user-form>
      <eit-button @click="${this.insert}">Insertar</eit-button>
    `;
  }

  
  insert(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('user-insert', {
      detail: this.user
    }));
  }

  
}
customElements.define('user-insert', UserInsert);