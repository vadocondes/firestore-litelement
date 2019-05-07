import { LitElement, html } from 'lit-element';
import { FirestoreMixin } from './firestore-mixin';

class FirestoreDocument extends FirestoreMixin(LitElement) {

  static get properties() {
    return {
      document: { type: String },
    };
  }

  constructor() {
    super();
    this.document = null;
  }

  updated(changedProperties) {
    if(changedProperties.has('collection') || changedProperties.has('document')) {
      this._doSubscription()
    }
  }

  _doSubscription() {
    super._doSubscription();
    if(this.document && this.collection) {
      console.log('tengo document y collection');
      this.unsubscribe = this.db.collection(this.collection).doc(this.document).onSnapshot((doc) => {
        this.saveData(doc.data());  
      });
    }
  }
}
customElements.define('firestore-document', FirestoreDocument);