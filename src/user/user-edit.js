import { LitElement, html, css } from 'lit-element';
import { userFormMixin } from './user-form-mixin';
import '../eit-button';

class UserEdit extends userFormMixin(LitElement) {

  static get properties() {
    return {
      user: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 25px;
        margin-bottom: 10px;
      }
    `;
  }
  render() {
    return html`
      <user-form .user="${this.user}" @user-changed="${this.onUserChanged}"></user-form>
      <eit-button href="#" @click="${this.edit}">Editar</eit-button>
    `;
  }

  edit(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('user-edit', {
      bubbles: true,
      composed: true,
      detail: this.user
    }));
  }

}
customElements.define('user-edit', UserEdit);