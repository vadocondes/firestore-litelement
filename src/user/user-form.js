import { LitElement, html } from 'lit-element';

class UserForm extends LitElement {
  
  static get properties() {
    return {
      user: { type: Object }
    };
  }
  render() {
    return html`
      <dile-input value="${this.user.first}" label="Nombre" name="first" @input="${this.inputChanged}"></dile-input>
      <dile-input value="${this.user.last}" label="Apellido" name="last" @input="${this.inputChanged}"></dile-input>
      <dile-input value="${this.user.born}" label="Año de nacimiento" name="born" @input="${this.inputChanged}"></dile-input>
    `;
  }

  inputChanged(e) {
    this.user[e.target.name] = e.target.value;
    this.dispatchEvent(new CustomEvent('user-changed', {
      detail: this.user
    }));
  }
}
customElements.define('user-form', UserForm);