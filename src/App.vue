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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.nav-wrapper{
  background-color: #274c77;
}

body {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
}

.container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.buttons {
    display: flex;
    flex-direction: column;
    
}
.btn {
    text-decoration: none;
    font-size: 1.25rem;
    position: relative;
    margin: 32px;
    
}

/* Button Login and Signup */

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

/* Button Confirm and Cancel */

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

    .btn-Cancel {
        background-image: linear-gradient(-180deg, #f35555, #ac2121);
        border-radius: 6px;
        color: #FFFFFF;
        cursor: pointer;
        font-family: 'Ubuntu', sans-serif;
        line-height: 40px;
        text-align: center;
        transition: box-shadow .2s; 
      }
      .btn-Cancel:hover {
          box-shadow: rgba(233, 17, 17, 0.974) 0 3px 8px;
        }

 

  /*Logo Button for the Map Page */    

.btn-logo {
  align-items: center;
  background-image: linear-gradient(144deg,#ceb8c9,#9E788F 40%,#a3cef1, #274c77);
  border-radius: 50%;
  display: flex;
  padding: 3px;
}

.btn-logo span {
  background-color: #e7ecef;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  transition: 300ms;
  /* content: url(./CssImages/Shoal-colour.png); */
  
}

.btn-logo:hover span {
  background: none;
  /* content: url(./CssImages/Shoal1.png); */
  transition: .9s;
}

@media (min-width: 768px) {
  .btn-logo {
    width: 120px;
    height: 120px;
  }
} 

/* Icon Buttons*/
.rounded-button {
  width: 60px;
  height: 60px;
  background: linear-gradient(144deg,#ceb8c9,#9E788F);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  text-decoration: none;
  transition: background 0.2s;
}

.rounded-button:hover {
  background: linear-gradient(144deg,#a3cef1, #274c77);
}


/*Input Boxes*/

.textbox{
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid #000000;
  
}

.textbox i{
  width: 26px;
  float: left;
  text-align: center;
}



.textbox input {
  border: none;
  outline: none;
  font-family: 'Ubuntu', sans-serif;
}


</style>
