export const FirestoreMixin = (Superclass) => {
  return class extends Superclass {
    static get properties() {
      return {
        collection: { type: String },
        data: { 
          type: Array,
          hasChanged() { return false; }
        }
      };
    }

    constructor() {
      super();
      this.db = firebase.firestore();
      this.unsubscribe = null;
      this.collection = null;
    }

    saveData(newData) {
      console.log('saveData', newData);
      this.data = newData;
      this.dispatchEvent(new CustomEvent('new-data', {
        detail: newData
      }));
    }

    _doSubscription() {
      console.log('_doSubscription', this.collection)
      //eliminar suscripción previa
      if(this.unsubscribe) {
        this.unsubscribe();
      }
    }
  }
}