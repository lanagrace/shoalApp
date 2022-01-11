import VueRouter from "vue-router";
import Login from "../views/LogIn.vue"
import Register from "../views/Register.vue"
import Dashboard from "../views/Dashboard.vue"
import Profile from "../views/Profile.vue"
import Home from "../views/Home.vue"
import firebase from "firebase/compat/app";



/* export const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { path: '/dashboard', component: Dashboard }
    ]
  }); */

  /* all of the routes are defined here */

export default new VueRouter({
  routes: [
    { name: 'Home', path: '/', component: Home },
    { name: 'Login', path: '/login', component: Login, 
      beforeEnter: (to, from, next) => {
        console.log("Login")
        firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            next();
          }else{
            next("/dashboard")
          }
        });
      } 
    },
    {name: 'Register', path: '/register', component: Register,
      beforeEnter: (to, from, next) => {
        console.log("Register")
        firebase.auth().onAuthStateChanged(async user => {
          if (!user) {
            next();
          }else{
            next("/dashboard")
          }
        });
      }
    },
    {name: 'Dashboard', path: '/dashboard', component: Dashboard },
    {name: 'Profile', path: '/profile', component: Profile }
  ],
  mode: 'history'
})