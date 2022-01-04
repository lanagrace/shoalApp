<template>
  <div class="container">
    <h4>Register</h4>
    <!-- this is the register form -->
    <form @submit.prevent="register" id="signup-form">
      <div class="row">
        <div class="col s6">
          <input
            type="text"
            id="signup-first"
            v-model="name"
            placeholder="First Name"
          />
        </div>
        <div class="col s6">
          <input
            type="text"
            id="signup-last"
            v-model="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <input
        type="email"
        id="signup-email"
        placeholder="Email address"
        v-model="email"
      />
      <input
        type="password"
        id="signup-password"
        placeholder="Password"
        v-model="password"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        v-model="password"
      />
      <p>
        <label>
          <input type="checkbox" class="filled-in" />
          <span>By proceeding I agree to Shoal Terms and Conditions</span>
        </label>
      </p>
      <button class="waves-effect blue btn" @click="register()">
        Register
      </button>
    </form>
  </div>
  <!-- roter-link adds a link/button to a wanted page -->
  <!--  <router-link to="/login">login</router-link> -->
</template>

<script>
/* sends data (email and password) to firebase and saves it there - creates a new user */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { db } from "../db.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      lastName: "",
      bio: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          console.log(cred);
          db.collection("users").doc(cred.user.uid).set({
            name: this.name,
            lastName: this.lastName,
            bio: this.bio,
          });
        })
        .then(() => {
          alert("Successfully registered! Please login.");
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>



<style>
/* add css here */
</style>