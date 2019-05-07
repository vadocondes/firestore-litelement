import { LitElement, html, css } from 'lit-element';
import './user-edit';

class UserItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
        padding: 0 15px;
      }
      section {
        display: flex;
        justify-content: space-between;
        align-items: center; 
      }
      span {
        display: block;
        margin-bottom: 5px;
      }
      .born {
        color: #888;
        font-size: 0.9em;
      }
      .action {
        cursor: pointer;
        display: inline-block;
        margin: 0 4px;
      }
      .actions {
        white-space: nowrap;
      }
      .userdata {
        flex-grow: 1;
      }
    `;
  }
  static get properties() {
    return {
      user: { type: Object },
      showEdit: { type: Boolean }
    };
  }
  
  constructor() {
    super();
    this.showEdit = false;
  }
  render() {
    return html`
      <section>
        <div class="userdata">
          <span class="name">${this.user.first} ${this.user.last}</span>
          <span class="born">${this.user.born}</span>
        </div>
        <div class="actions"> 
          <span class="action" @click="${this.onDelete}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </span>
          <span class="action" @click="${this.onEdit}">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </span>
        </div>
      </section>
      ${this.showEdit
        ? html`<user-edit .user="${this.user}" @user-edit="${this.hideEdition}"></user-edit>`
        : ''
      }     
    `;
  }
  onEdit() {
    this.showEdit = !this.showEdit;
  }
  onDelete(e) {
    this.dispatchEvent(new CustomEvent('delete-user', {
      bubbles: true,
      composed: true,
      detail: this.user
    }));
  }
  hideEdition() {
    this.showEdit = false;
  }
}
customElements.define('user-item', UserItem);