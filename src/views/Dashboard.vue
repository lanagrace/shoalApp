<template>
  <div>
    <h2>Dashboard</h2>
    <p>This page is only visible to users that are currently logged in</p>
    <p>This is where the map goes</p>
    <p>User: {{ email }}</p>
    <button @click="signout()">Sign out</button>
  </div>
</template>

<script>
import "firebase/compat/auth";

import firebase from "firebase/compat/app";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.email = user.email;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
      } else {
        // User is signed out
        this.$router.push("/login");
      }
    });
  },
  methods: {
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
          console.log(error)
        });
    },
  },
};
</script>

<style>
/* add css here */
</style>