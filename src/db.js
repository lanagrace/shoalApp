import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//import * as firebase from 'firebase/app'
//import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'shoal-befdc' })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })