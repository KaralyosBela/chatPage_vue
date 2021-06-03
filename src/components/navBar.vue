<template>
  <div>
    <v-app-bar app src="@/assets/nav.jpg">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title
        class="pl-2 cursor font-weight-regular"
        :class="{ 'animate__animated animate__tada': animatee }"
        @mouseover="animateTitle()"
        >Weather<strong>Station</strong></v-toolbar-title
      >
      <v-spacer></v-spacer>

      <div v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
          v-for="button in buttons"
          :key="button.title"
          :to="button.link"
          depressed
          text
          rounded
          class="ma-1"
          active-class="primary"
          ><v-icon left>{{ button.icon }}</v-icon
          >{{ button.title }}</v-btn
        >

        <v-btn
          v-if="loggedIn"
          @click="logout()"
          depressed
          text
          rounded
          class="ma-0"
          active-class="primary"
          ><v-icon left>mdi-logout</v-icon>Logout</v-btn
        >
      </div>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list-item v-if="loggedIn">
        <v-list-item-avatar>
          <v-img :src="userphoto"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="title">{{ username }}</v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title class="title"> Guest </v-list-item-title>
          <v-list-item-subtitle>You are not logged in.</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="button in buttons"
          :key="button.title"
          :to="button.link"
          color="blue darken-2"
        >
          <v-list-item-icon>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ button.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="loggedIn" @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
//import firebase from "../firebase/config.js";
import { auth } from "../firebase/config.js";

export default {
  name: "navBar",
  data() {
    return {
      drawer: false,
      animate: true,
    };
  },
  computed: {
    animatee() {
      return this.animate;
    },
    username() {
      return this.$store.state.userName;
    },
    userphoto() {
      return this.$store.state.userPhoto;
    },
    loggedIn() {
      return this.$store.state.userLoggedIn;
    },
    buttons() {
      let buttons = [];
      if (!this.$store.state.userLoggedIn) {
        buttons = [
          {
            title: "Create account",
            icon: "mdi-account-plus",
            link: "Signup",
          },
          {
            title: "Sign in",
            icon: "mdi-account",
            link: "Signin",
          },
        ];
        buttons.unshift({
          title: "Home",
          icon: "mdi-home",
          link: "/",
        });
        return buttons;
      }
      buttons = [
         {
          title: "User settings",
          icon: "mdi-cog",
          link: "settings",
        },
        {
        title: "Chatroom",
        icon: "mdi-chat",
        link: "chatroom",
      }

      ];
      buttons.unshift({
        title: "Home",
        icon: "mdi-home",
        link: "/",
      });

      return buttons;
    },
  },
  methods: {
    logout() {
      auth.signOut();
      this.$store.commit("setUserLoggedOut");
      this.$router.push({ name: "Home" });
    },
    // goTo() {
    //   this.$router.push({ name: "Dashboard" });
    // },
    animateTitle() {
      this.animate = true;
      setTimeout(() => {
        this.animate = false;
      }, 1000);
    },
  },
};
</script>

<style scoped>
.cursor {
  cursor: pointer;
}
</style>
