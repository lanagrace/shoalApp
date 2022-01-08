<template>
  <div>
    <h2>Dashboard</h2>
    <p>This page is only visible to users that are currently logged in</p>
    <!-- <p>This is where the map goes</p> -->
    <iframe>
      width="100%"
      height="400px"
      src="https://api.mapbox.com/styles/v1/joejonesss/ckwscy5ke335v14mknvu5az7w.html?title=false&access_token=pk.eyJ1Ijoiam9lam9uZXNzcyIsImEiOiJja3dzY3dha3YxNTc1MnZsY2lrMXlnYWJmIn0.rbYKWeIOJdf5fjPFKuHNLA&zoomwheel=true&fresh=true#12.93/50.3756/-4.1301"
      title="shoalThemedMap"
      style="border: none"
    </iframe>
    <p>User: {{ email }}</p>
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
          console.log(error);
        });
    },
  },
};
</script>

<style>
/* add css here */
</style>