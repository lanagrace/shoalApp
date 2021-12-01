import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/compat/app';


const firebaseConfig = {
  apiKey: "AIzaSyAwOKTdRgc6_ZWxbtpVFoqlcg5V4dMTQZ0",
  authDomain: "shoal-befdc.firebaseapp.com",
  projectId: "shoal-befdc",
  storageBucket: "shoal-befdc.appspot.com",
  messagingSenderId: "160178018743",
  appId: "1:160178018743:web:614ed5b32c0594393bf032"
};
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')