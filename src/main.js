import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store/index.js';
import {auth} from './firebase/config.js';


Vue.config.productionTip = false;

let app;

auth.onAuthStateChanged((user) => {
  if (!app) {
    new Vue({
      router,
      vuetify,
      store,
      render: (h) => h(App),
      created() {
        if (!user) {
          console.log("User nincs bejelentkezve.");
          this.$store.commit("setUserLoggedOut");
        } else {
          console.log("User bejelentkezve-> " + user.email);
          this.$store.commit("setUserLoggedIn", {
            name: auth.currentUser.displayName,
            photoUrl: auth.currentUser.photoURL,
            loggedIn: true,
          });
        }
      },
    }).$mount("#app");
  }
});

