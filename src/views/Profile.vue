<template>
  <div class="container">
    <div class="row">
      <!-- add an icon instead? -->
      <div class="col s6">
        <i class="material-icons prefix">account_circle</i>
      </div>
      <div class="col s6">
        <p>User: {{ name }}</p>
        <i class="material-icons" @click="editMode">edit</i>
        <div v-if="edit">
          <input type="text" placeholder="Biography" v-model="bio_input" />
          <button class="waves-effect blue btn" @click="updateProfile()">
            Add
          </button>
        </div>

        <div v-if="!edit">
          <p>Bio: {{ bio }}</p>
        </div>
      </div>
    </div>

    <h4>Emergency contacts</h4>
    <ul>
      <li v-for="contact in emergencyContactArr" :key="contact" >{{ contact }}</li>
    </ul>
    <input type="text" placeholder="Add contacts" v-model="emergencyContact" />
    <button class="waves-effect blue btn" @click="addContact()">Add</button>
    <h4>Locations</h4>
    <ul>
      <li v-for="location in locationsArr" :key="location" >{{ location }}</li>
    </ul>
    <input type="text" placeholder="Add location" v-model="locations" />
    <button class="waves-effect blue btn" @click="addLocation()">Add</button>

    <button @click="signout()">Sign out</button>
  </div>
</template>

<script>
import "firebase/compat/auth";
import { db } from "../db.js";
import firebase from "firebase/compat/app";
/* 
var users = db.collection("users").doc();
import { db } from "../db.js"; */

export default {
  data() {
    return {
      edit: false,
      email: "",
      password: "",
      bio: "",
      bio_input: "",
      name: "",
      emergencyContact: "",
      emergencyContactArr: [],
      locations: "",
      locationsArr: [],
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email;
          var docRef = db.collection("users").doc(user.uid);

          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                let userDocs = doc.data();
                console.log("Document data:", userDocs);
                this.name = userDocs.name;
                this.bio = userDocs.bio;
                this.emergencyContactArr = userDocs.emergencyContact;
                this.locationsArr = userDocs.locations;
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });

          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

    editMode() {
      this.edit = !this.edit;
    },
    /* in the wrong place */
    updateProfile() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var docRef = db.collection("users").doc(user.uid);

          docRef
            .update({
              bio: this.bio_input,
            })
            .then(() => {
              console.log("Document successfully updated!");
              this.getUserData();
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

    addContact() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var docRef = db.collection("users").doc(user.uid);
          /* if it says set, the array will only have one string; if it says update, it wil contain more strings */
          docRef.update({
              emergencyContact:
                firebase.firestore.FieldValue.arrayUnion(this.emergencyContact),
            })
            .then(() => {
              console.log("Document successfully updated!");
              this.getUserData();
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

      addLocation() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var docRef = db.collection("users").doc(user.uid);
          /* if it says set, the array will only have one string; if it says update, it wil contain more strings */
          docRef.update({
              locations:
                firebase.firestore.FieldValue.arrayUnion(this.locations),
            })
            .then(() => {
              console.log("Document successfully updated!");
              this.getUserData();
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push("/login");
        })
        .catch((error) => {
          // An error happened
          console.log(error);
        });
    },
  },
};
</script>

<style>
.center-align {
  width: 100%;
  height: 15vh;
  justify-content: center;
  align-content: center;
  background-color: salmon;
}

.row {
  padding: 0;
}
</style>