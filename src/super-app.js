import { LitElement, html } from 'lit-element';
import './user/user-insert';
import './user/user-list';
import './firestore/firestore-collection';

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
  }

  render() {
    return html`
      <firestore-collection collection="users" @new-data="${this.saveUsers}"></firestore-collection>
      <user-insert @user-insert="${this.userInsert}"></user-insert>
      <user-list 
        .users="${this.users}" 
        @delete-user="${this.deleteUser}"
        @user-edit="${this.editUser}"
      ></user-list>
      
      <hr>
      <button @click="${this.getUsersSnapshot}">Obten los datos una vez</button>
    `;
  }

  saveUsers(e) {
    this.users = e.detail;
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

  deleteUser(e) {
    let user = e.detail;
    this.db.collection("users").doc(user.id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  editUser(e) {
    const user = e.detail;
    const userRef = this.db.collection("users").doc(user.id);
    user.id = null;
    return userRef.update(user)
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}
customElements.define('super-app', SuperApp);