<template>
  <div id="app">
    <div class="cont">
      <!-- navbar that is on every page -->
      <nav class="nav-wrapper">
        <!-- v-if stops it from being visible while we're on that page -->

        <router-link v-if="user.loggedIn" to="/dashboard"
          >Dashboard</router-link
        >
        <router-link v-if="user.loggedIn" to="/profile"
          >Profile</router-link
        >
      </nav>

      <router-view />
    </div>
    <div class="alert">
      <h1 class="starth1">
        This app only works on mobile screen sizes, please resize your screen or
        open on a mobile device
      </h1>
    </div>
  </div>
</template>

<script>
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import M from 'materialize-css';
import { mapGetters } from "vuex";

/* should recognise if a user is logged in and open a dashboard or login page */
export default {
  name: "App",
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {
    console.log(this.user.loggedIn)
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
  background-image: linear-gradient(-180deg, #ceb8c9, #9e788f);
}
.nav-wrapper ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
.nav-wrapper li {
  display: inline;
  text-align: center;
}
.nav-wrapper a {
  text-decoration: none;
  color: black;
  padding: 10px;
  font-size: 20px;
}
.nav-wrapper a:hover {
  background-color: #e7ece7;
  color: black;
  box-shadow: #a3cef1 0 3px 8px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: background-color 2s ease-out;
  -moz-transition: background-color 2s ease-out;
  -o-transition: background-color 2s ease-out;
  transition: background-color 2s ease-out;
}
.nav-wrapper a:active {
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
.starth1{
  text-align: center;
  background: white;
}
@media only screen and (max-width: 600px) {
  .alert {
    display: none;
  }
}

@media only screen and (min-width: 600px) {

  /* users that are using a screen larger than 600px will get the 
  alert to resize their scrren size so they could use the web app */
  .cont {
    display: none !important;
  }
}
</style>
