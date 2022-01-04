<template>
  <div class="container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <input type="email" placeholder="Email address" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <button class="waves-effect waves-light btn" @click="login()">Login</button>
    </form>
    <p>Don't have an account? </p>
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

/* checks if user credentials match with the ones in our database; 
opens a dashboard page if they do */
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          alert("Successfully logged in");
          console.log(response);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          alert(error.message);
        });
      
    },
  },
};
</script>

<style>

/* add css here */
#logoImg {
  margin-bottom: 5vh;
  width: 60%;
  justify-content: center;
  align-items: center;
}

#name {
  justify-content: center;
  align-items: center;
}

#map {
  height: 70vh;
}

input {
  margin-right: 20px;
}
</style>