<template>
  <div>
    <v-sheet
      elevation="4"
      class="pa-6 mx-auto"
      max-width="500px"
      rounded="lg"
      :color="formColor"
    >
      <v-form @submit.prevent="submitForm()" v-model="formValid" ref="form">
        <v-text-field
          :rules="rules"
          type="email"
          label="E-mail"
          v-model="email"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          type="password"
          label="Password"
          v-model="password"
        ></v-text-field>
        <v-checkbox
          label="Remember me"
          required
          @change="rememberMe()"
          v-model="rememberUser"
        ></v-checkbox>
        <v-btn color="primary" block rounded @click="login()" type="submit"> Sign in</v-btn>
        <router-link to="Signup" class="text-decoration-none">
          <p class="pt-4 d-flex justify-center mb-0">
            You don't have an account yet?
          </p>
        </router-link>
      </v-form>
    </v-sheet>
    <transition
      enter-active-class="animate__animated animate__bounceIn"
      leave-active-class="animate__animated animate__fadeOutLeft"
    >
      <v-alert
        ref="alert"
        v-if="errorMsg"
        type="error"
        dense
        colored-border
        border="left"
        class="mx-auto ma-3"
        rounded="md"
        elevation="3"
        width="500px"
      >
        <template v-slot:close>
          <v-icon @click="toggle" color="red">mdi-close</v-icon>
        </template>
        {{ errorMsg }}
      </v-alert>
    </transition>
  </div>
</template>

<script>
//import firebase from "../firebase/config.js";
import { auth } from "../firebase/config.js";
export default {
  data() {
    return {
      rules: [(value) => !!value || "Required."],
      formValid: false,
      formColor: "rgb(255,255,255,0.75)",
      email: "",
      password: "",
      errorMsg: "",
      rememberUser: false,
    };
  },
  computed: {},
  methods: {
    submitForm() {
      //console.log("form submitted");
      //console.log(this.formValid);
      this.$refs.form.validate();
    },
    rememberMe() {
      // if (this.rememberUser) {
      //   firebase.setPersistence(auth.auth.Auth.Persistence.LOCAL);
      // } else {
      //   firebase.setPersistence(auth.auth.Auth.Persistence.SESSION);
      // }
      // console.log(this.rememberUser);
      // console.log(auth.auth.Auth.Persistence);
    },
    toggle() {
      this.$refs.alert.toggle();
      this.errorMsg = "";
    },
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.commit("setUserLoggedIn", {
            name: auth.currentUser.displayName,
            photoUrl: auth.currentUser.photoURL,
            loggedIn: true,
          });
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMsg = error.message;
          this.errorMsg.concat(" ", error.code);
        });
    },
  },
};
</script>

