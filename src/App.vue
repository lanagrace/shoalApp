<template>
  <div id="app">
    <LogIn msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import LogIn from './views/LogIn.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';



export default {
  name: 'App',
  components: {
    LogIn
  }, 
  mounted(){
    firebase.auth().createUserWithEmailAndPassword('lana@gmail.com', '1234567').then(
      function(user){
        console.log('user created', user)

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
