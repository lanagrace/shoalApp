<template>
  <div class="container">
    <!-- this is the register form -->
  <form @submit.prevent="register">
    <h2>Register</h2>
    <input
      type="text"
      placeholder="Name"
    />
    <input
      type="email"
      placeholder="Email address"
      v-model="email"
    />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <button class="waves-effect waves-light btn" @click="register()">Register</button>
  </form>

<!-- roter-link adds a link/button to a wanted page -->
<!--  <router-link to="/login">login</router-link> -->
</div>
</template>

<script>
/* sends data (email and password) to firebase and saves it there - creates a new user */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
export default {
    data() { 
  return { 
    email: '', 
    password: '', 
  }; 
},
methods: {
  register() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        alert('Successfully registered! Please login.');
        this.$router.push('/login');
      })
      .catch(error => {
        console.log(error.message);
      });
  },
},

}
</script>



<style>
  /* add css here */
</style>