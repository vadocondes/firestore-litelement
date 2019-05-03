import { LitElement, html } from 'lit-element';
import './user-insert';

class SuperApp extends LitElement {

  static get properties() {
    return {
      users: { type: Array }
    };
  }
  constructor() {
    super();
    this.users = [];

    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();

    this.db.collection("users")
    .onSnapshot( querySnapshot => {
        const newUsersCollection = [];
        querySnapshot.forEach( doc => {
          newUsersCollection.push(doc.data());
        });
        this.users = newUsersCollection;
    });

  }

  render() {
    return html`
      <user-insert @user-insert="${this.userInsert}"></user-insert>
      ${this.users.map( user => {
        return html`
          <p>${user.first}</p>
          `;
      })}
      <hr>
      <button @click="${this.getUsersSnapshot}">Obten los datos una vez</button>
    `;
  }

  getUsersSnapshot() {
    this.db.collection("users").get().then((querySnapshot) => {
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  }
  userInsert(e) {
    console.log('userinsert', e.detail)
    this.db.collection("users").add(e.detail)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

}
customElements.define('super-app', SuperApp);