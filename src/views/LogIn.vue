<template>
   <div class="container1">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <div class="textbox">
         <ion-icon name="mail-outline"></ion-icon>
         <div class="form-input">
      <input type="email" placeholder="Email address" v-model="email" /></div>
      <ion-icon name="lock-closed-outline"></ion-icon>
      <input type="password" placeholder="Password" v-model="password" />
      </div>
      <button class="btn-Login">Login</button>
    <p>Don't have an account? </p><button class="btn-SignUp">
    <router-link to="/register">Register</router-link>
    </button>
    </form>
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
      /* uses firebase authentication to check if the user exists and logs them in */
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          alert("Successfully logged in");
          console.log(response);
          /* if the user exists this router will open the dashboard page */
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

.btn-Login {
  background-color: initial;
  background-image: linear-gradient(-180deg, #a3cef1, #274c77);
  border-radius: 6px;
  color: #FFFFFF;
  cursor: pointer;
  font-family: 'Ubuntu', sans-serif;
  line-height: 40px;
  text-align: center;
  transition: box-shadow .2s; 
    
}
.btn-Login:hover {
    box-shadow: rgba(8, 126, 223, 0.481) 0 3px 8px;
  }

.btn-SignUp {
  background-color: initial;
  background-image: linear-gradient(-180deg, #ceb8c9, #9E788F);
  border-radius: 6px;
  color: #FFFFFF;
  cursor: pointer;
  font-family: 'Ubuntu', sans-serif;
  line-height: 40px;
  text-align: center;
  transition: box-shadow .2s; 
}

.btn-SignUp:hover {
    box-shadow: rgba(158, 50, 143, 0.5) 0 3px 8px;
}

.btn-SignUp a{
  color:#fff;
}
.textbox{
  overflow: hidden;
  font-size: 20px;
  padding: 4px ;
  margin: 4px ;
  border-bottom: 1px solid #000000;
  margin-left: auto;
  margin-right: auto;
  width: 20em
}

.textbox i{
  width: 26px;
  float: center;
  text-align: center;
}

.textbox input {
  border: none;
  outline: none;
}

.container1{
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
  background-image: linear-gradient(-180deg, #a3cef1, #274c77);
}

.container1 h2{
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
  
}

.container1 form{
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
}

.form-input{
  width: auto;
}

@media only screen and (min-width: 600px) {
  .alert {
    display: block;
  }
  .cont {
    display: none;
  }
}
</style>