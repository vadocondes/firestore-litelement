import { LitElement, html } from 'lit-element';

class FirestoreCollection extends LitElement {
  static get properties() {
    return {
      collection: { 
        type: String,
        hasChanged() {
          return false;
        }
      },
      data: { type: Array }
    };
  }

  constructor() {
    super();
    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();

    this.collection = null;
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if(name == 'collection' && newValue) {
      console.log('attributeChangedCallback', name, oldValue, newValue);
      this.db.collection(newValue)
      .onSnapshot( querySnapshot => {
          const newData = [];
          querySnapshot.forEach( doc => {
            const currItem = {
              ...doc.data(),
              id: doc.id
            }
            newData.push(currItem);
          });
          this.saveData(newData);
      });
    }
  }

  saveData(newData) {
    console.log('saveData', newData);
    this.data = newData;
    this.dispatchEvent(new CustomEvent('new-data', {
      detail: newData
    }));
  }
}
customElements.define('firestore-collection', FirestoreCollection);