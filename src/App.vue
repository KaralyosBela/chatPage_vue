<template>
  <v-app>
    <navigation-bar />

    <v-main class="bg">
      <v-container>
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import 'animate.css';
//import firebase from "./firebase/config.js";
//import {auth} from "./firebase/config.js";
import navigationBar from "./components/navBar.vue";

export default {
  
  name: "App",
  components: {
    navigationBar,
  },

  data: () => ({
    loginDetails: {
      username: "",
      photo: "",
    },
  }),
  methods: {
    
  },
//   created(){
//  auth.onAuthStateChanged((user) => {
//     console.log("On Auth State Changed")
//       if (!user) {
//         console.log("User nincs bejelentkezve.");
//               this.$store.commit('setUserLoggedOut');

//       } else{
//         console.log("User bejelentkezve-> "+user.email);
//         this.$store.commit("setUserLoggedIn", {
//             name: auth.currentUser.displayName,
//             photoUrl: auth.currentUser.photoURL,
//             loggedIn: true,
//           });
//       }
//   });
//   }
};
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  background-image: url("C:/Users/omnit/weatherapp/src/assets/mountain.jpg");
  background-size: cover;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>