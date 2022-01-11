<template>
  <div class="container3">
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
      <button class="btn-Confirm" @click="register()">
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


.container3{
  position: absolute;
  padding-bottom: 20px;
  padding-left: 0px ;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #9E788F;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 8px;
  background-image: linear-gradient(-180deg, #9e788fe5,#ceb8c927);
  
}

.container1 h2{
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  
}

.container3 form{
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
}

.form-input{
  width: auto;
}

.btn-Confirm {
    background-color: initial;
    background-image: linear-gradient(-180deg, #5bd84a, #3e9732);
    border-radius: 6px;
    color: #FFFFFF;
    cursor: pointer;
    font-family: 'Ubuntu', sans-serif;
    line-height: 40px;
    text-align: center;
    transition: box-shadow .2s;
      
  }
  .btn-Confirm:hover {
      box-shadow: rgba(98, 252, 59, 0.974) 0 3px 8px;
    }
</style>


