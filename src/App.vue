<template>
  <div id="app">
    <div class="cont">
    <!-- navbar that is on every page -->
    <nav class="nav-wrapper">
      <!-- v-if stops it from being visible while we're on that page -->
      
      <router-link v-if="$route.name != 'Home'" to="/dashboard">Dashboard</router-link>
      <router-link v-if="$route.name != 'Home'" to="/profile">Profile</router-link>

    </nav>

    <router-view />

    </div>
    
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

.nav-wrapper {
  background-image: linear-gradient(-180deg, #ceb8c9, #9E788F);
}
.nav-wrapper ul{
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
.nav-wrapper li{
  display: inline;
  text-align: center;
}
.nav-wrapper a{
  text-decoration: none;
  color:black;
  padding: 10px;
  font-size: 20px;
}
.nav-wrapper a:hover{
  background-color:  #e7ece7;
  color: black;
  box-shadow: #a3cef1 0 3px 8px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: background-color 2s ease-out;
  -moz-transition: background-color 2s ease-out;
  -o-transition: background-color 2s ease-out;
  transition: background-color 2s ease-out;
}
.nav-wrapper a:active{
  background-color: #274c77;
  color: white;
}

html { 
  background: url(./assets/Shoal\ login\ page.jpg) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

</style>
