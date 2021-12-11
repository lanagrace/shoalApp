<template>
  <div class="container">
    <div class="row">
      <!-- add an icon instead? -->
      <div class="col s6">
        <h6 class="center-align">Profile picture</h6>
      </div>
      <div class="col s6">
        <p>User: {{ email }}</p>
        <p>user bio</p>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <p>User's emergency contacts</p>
            </div>
            <div class="card-action">
              <a>Add contacts</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12">
        <div class="card horizontal">
          <div class="card-stacked">
            <div class="card-content">
              <p>User's saved locations</p>
            </div>
            <div class="card-action">
              <a>Add location</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
</style>