<template>
  <div id="app">
    <!-- navbar that is on every page -->
    <nav class="nav-wrapper">
      <!-- v-if stops it from being visible while we're on login page -->
      <!-- 
        add icons, on profile page an arrow to go back to the map, on map a 
        profile icon 
       -->
      <router-link v-if="$route.name != 'Login'" to="/login">Login</router-link>
      <router-link v-if="$route.name != 'Login'" to="/profile"
        >Profile</router-link
      >
      <router-link v-if="$route.name != 'Login'" to="/dashboard"
        >Dashboard</router-link
      >
    </nav>

    <router-view />
  </div>
</template>

<script>
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import M from 'materialize-css';


/* should recognise if a user is logged in and open a dashboard or login page */
export default {
  name: "App",
  mounted() {
    M.AutoInit()
 firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        const lastSignInTime = new Date(user.metadata.lastSignInTime);
        const lastSignInTimeTimeStamp = Math.round(lastSignInTime.getTime() / 1000);
        const yesterdayTimeStamp = Math.round(new Date().getTime() / 1000) - (24 * 3600);
        if(lastSignInTimeTimeStamp < yesterdayTimeStamp){
          await firebase.auth().signOut()
          this.setState({
            loggedIn: false
          });
          return false;
        }
        this.setState({
          loggedIn: true,
          user
        });
      }
    });
  },
  
};
</script>

<style>
/* add css here */

</style>
