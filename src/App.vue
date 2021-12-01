<template>
  <div id="app">

    
        <nav>
            <router-link to="/login">login</router-link>
        </nav>

    <router-view/>
  </div>

  
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
  name: 'App',
   
  mounted(){
    firebase.auth().createUserWithEmailAndPassword('lana@gmail.com', '1234567').then(
      (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...

      }, 
      function(err){
        console.log(err)
      }
    )
  }
}
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
