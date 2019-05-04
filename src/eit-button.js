import { LitElement, html, css } from 'lit-element';

class EitButton extends LitElement {

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      span {
        display: inline-block;
        text-decoration: none;
        text-transform: uppercase;
        border-radius: 5px;
        background-color: #eee;
        padding: 8px;
        cursor: pointer;
        color: #333;
      }
      span:hover {
        background-color: #f5f5f5;
        color: #66e;
      }
    `;
  }

  render() {
    return html`
      <span>
        <slot></slot>
      </span>
    `;
  }
}
customElements.define('eit-button', EitButton);