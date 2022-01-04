import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import * as firebase from 'firebase/app'
//import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAwOKTdRgc6_ZWxbtpVFoqlcg5V4dMTQZ0",
    authDomain: "shoal-befdc.firebaseapp.com",
    projectId: "shoal-befdc",
    storageBucket: "shoal-befdc.appspot.com",
    messagingSenderId: "160178018743",
    appId: "1:160178018743:web:614ed5b32c0594393bf032"
  };



// Get a Firestore instance
firebase.initializeApp(firebaseConfig);

export const db = firebase
  .firestore()


// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })