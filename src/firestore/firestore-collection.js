import { LitElement, html } from 'lit-element';

class FirestoreCollection extends LitElement {
  static get properties() {
    return {
      collection: { type: String }
    };
  }
  
}
customElements.define('firestore-collection', FirestoreCollection);