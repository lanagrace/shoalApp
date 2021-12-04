<template>
  <div id="app">
    <!-- login from the navbar -->
    <nav>
      <!-- v-if stops it from being visible while we're on login page -->
      <router-link v-if="$route.name != 'Login'" to="/login">login</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
import "firebase/compat/auth";
import firebase from "firebase/compat/app";

/* should recognise if a user is logged in and open a dashboard or login page */
export default {
  name: "App",
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(uid);
        this.$router.push("/dashboard");
      } else {
        // User is signed out
        this.$router.push("/login");
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
