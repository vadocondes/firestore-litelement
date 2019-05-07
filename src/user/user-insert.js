import { LitElement, html, css } from 'lit-element';
import 'dile-input/dile-input';
import './user-form';
import { userFormMixin } from './user-form-mixin';
import '@dile/dile-button/dile-button';

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
      <dile-button @click="${this.insert}">Insertar</dile-button>
      <dile-button @click="${this.insertAndSetDefault}">Insertar y definir predeterminado</dile-button>
    `;
  }

  
  insert() {
    this.dispatchEvent(new CustomEvent('user-insert', {
      detail: this.user
    }));
  }

  insertAndSetDefault() {
    this.insert();
    this.dispatchEvent(new CustomEvent('user-save-default', {
      detail: this.user
    }));
  }
}
customElements.define('user-insert', UserInsert);