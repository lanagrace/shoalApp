<template>
  <div class="container">
    <div class="row">
      <!-- add an icon instead? -->
      <div class="col s6">
        <i class="material-icons prefix">account_circle</i>
      </div>
      <div class="col s6">
        <p>User: {{ email }}</p>
        <input type="text" placeholder="Biography" v-model="bio" />
        <button class="waves-effect blue btn" @click="updateProfile()">
          Add
        </button>
      </div>
    </div>

    <h4>Emergency contacts</h4>
    <input type="text" placeholder="Add contacts" v-model="emergencyContact" />
    <button class="waves-effect blue btn" @click="updateProfile()">Add</button>
    <h4>Locations</h4>
    <input type="text" placeholder="Add location" v-model="locations" />
    <button class="waves-effect blue btn" @click="updateProfile()">Add</button>

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

/* check out koji je trenutni user id
proc kroz database ako se matchaju
kad se nade match onda prikazi to i to */

export default {
  data() {
    return {
      email: "",
      password: "",
      bio: "",
      name: "",
      emergencyContact: "",
      locations: "",
    };
  },
  mounted() {
   
  },
  methods: {
    getUserData(){
       firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;

        var docRef = db.collection("users").doc(user.uid);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
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
    /* in the wrong place */
    updateUser() {
      let user = firebase.auth().currentUser;
      user
        .updateProfile({
          bio: this.bio,
          emergencyContacts: this.emergencyContacts,
          locations: this.locations,
        })
        .then(
          function () {
            var bio = user.bio;
            console.log(bio);
          },
          function (error) {
            console.log(error);
          }
        );
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