<template>
   <div class="container2">
    <div class="row">
      <!-- add an icon instead? -->
      <div class="col s6">
        <!-- icon represents the profile picture -->
        <i class="rounded-button"><ion-icon1 name="person-circle-outline"></ion-icon1></i>
      </div>
      <div class="cols6">
        <!-- shows users name on the profile page -->
        <p>{{ name }}</p>
        <!-- when this icon is clicked you enter edit mode and can change your bio -->
        <i class="material-icons" @click="editMode">edit</i>
        <div v-if="edit">
          <input type="text" placeholder="Biography" v-model="bio_input" />
          <!-- this button adds your new bio to the database -->
          <button class="waves-effect blue btn" @click="updateProfile()">
            Add
          </button>
        </div>

        <div v-if="!edit">
          <!-- this p tag shows the current bio -->
          <p>Bio: {{ bio }}</p>
        </div>
      </div>
    </div>

    <h4>Emergency contacts</h4>
    <!-- ul tag creates a list of contacts, this can be changed to something else -->
    <ul>
      <li v-for="contact in emergencyContactArr" :key="contact" >{{ contact }}</li>
    </ul>
    <input type="text" placeholder="Add contacts" v-model="emergencyContact" />
    <button class="btn-Confirm" @click="addContact()">Add</button>
    <h4>Locations</h4>
    <!-- ul tag creates a list of locations, this can be changed to something else -->
    <ul>
      <li v-for="location in locationsArr" :key="location" >{{ location }}</li>
    </ul>
    <input type="text" placeholder="Add location" v-model="locations" />
    <button class="btn-Confirm" @click="addLocation()">Add</button>

    <div>
    <button class="btn-Cancel" @click="signout()">Sign out</button>
  </div>
  </div>
  
</template>

<script>
import "firebase/compat/auth";
import { db } from "../db.js";
import firebase from "firebase/compat/app";
/* 
var users = db.collection("users").doc();
import { db } from "../db.js"; */

export default {
  data() {
    return {
      edit: false,
      email: "",
      password: "",
      bio: "",
      bio_input: "",
      name: "",
      emergencyContact: "",
      emergencyContactArr: [],
      locations: "",
      locationsArr: [],
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.email = user.email;
          var docRef = db.collection("users").doc(user.uid);

          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                let userDocs = doc.data();
                console.log("Document data:", userDocs);
                this.name = userDocs.name;
                this.bio = userDocs.bio;
                this.emergencyContactArr = userDocs.emergencyContact;
                this.locationsArr = userDocs.locations;
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });

          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

    editMode() {
      this.edit = !this.edit;
    },
    
    updateProfile() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var docRef = db.collection("users").doc(user.uid);

          docRef
            .update({
              bio: this.bio_input,
            })
            .then(() => {
              console.log("Document successfully updated!");
              this.getUserData();
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

    addContact() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var docRef = db.collection("users").doc(user.uid);
          /* if it says set, the array will only have one string; if it says update, it wil contain more strings */
          docRef.update({
              emergencyContact:
                firebase.firestore.FieldValue.arrayUnion(this.emergencyContact),
            })
            .then(() => {
              console.log("Document successfully updated!");
              this.getUserData();
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

      addLocation() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var docRef = db.collection("users").doc(user.uid);
          /* if it says set, the array will only have one string; if it says update, it wil contain more strings */
          docRef.update({
              locations:
                firebase.firestore.FieldValue.arrayUnion(this.locations),
            })
            .then(() => {
              console.log("Document successfully updated!");
              this.getUserData();
            })
            .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
            });
        } else {
          // User is signed out
          this.$router.push("/login");
        }
      });
    },

    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push("/login");
        })
        .catch((error) => {
          // An error happened
          console.log(error);
        });
    },
  },
};
</script>

<style>

.row {
  padding: 0;
}

.rounded-button {
  width: 175px;
  height: 175px;
  background: linear-gradient(144deg,#ceb8c9,#9E788F);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  text-decoration: none;
  
  
}

.rounded-button:hover {
  background: linear-gradient(144deg,#a3cef1, #274c77);
  color: black;
}

.ion-icon1{
  font-size: 175px;
}

.col.s6{
  padding: 10px;
  text-align: center;
  margin: 2px;
  
}
.cols6{
  padding-top: 14px;
  font-size: 20px;
  text-align: left;
  border-bottom: 2px solid black;
}

.col-s6{
  padding-top: 140px;
}

.container2{
  position: absolute;
  padding-bottom: 20px;
  padding-left: 0px ;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #9E788F;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 3px 8px;
  background-image: linear-gradient(-180deg, #a3cef1, #274c77);
  width: 500px;
  height: 600px;
}

.container2 form{
  padding: 20px;
  box-sizing: border-box;
  align-items: center;
}

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
        margin-top: 3vh;
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
</style>