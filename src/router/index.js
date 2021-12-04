import VueRouter from "vue-router";
import Login from "../views/LogIn.vue"
import Register from "../views/Register.vue"
import Dashboard from "../views/Dashboard.vue"



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
    { name: 'Login', path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/dashboard', component: Dashboard }
  ],
  mode: 'history'
})