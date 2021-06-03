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
          label="First name"
          v-model="registrationCredentials.firstname"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          label="Last name"
          v-model="registrationCredentials.lastname"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          label="E-mail"
          v-model="registrationCredentials.email"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          type="password"
          label="Password"
          v-model="registrationCredentials.password"
        ></v-text-field>
        <v-text-field
          :rules="rules"
          type="password"
          label="Password again"
          v-model="registrationCredentials.passwordAgain"
        ></v-text-field>
        <v-btn
          class="mt-3"
          color="primary"
          type="submit"
          block
          rounded
          @click="credentialsCheck()"
          ><v-icon left>mdi-account-plus</v-icon>Create account</v-btn
        >
        <router-link to="Signin" class="text-decoration-none">
          <p class="pt-3 d-flex justify-center mb-0">
            Already registered? Sign in
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
        max-width="500px"
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
import { auth, db } from "../firebase/config.js";
export default {
  data() {
    return {
      rules: [(value) => !!value || "Required."],
      formValid: true,
      formColor: "rgb(255,255,255,0.75)",
      registrationCredentials: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        passwordAgain: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    submitForm() {
      //console.log("form submitted");
      //console.log(this.formValid);
      this.$refs.form.validate();
    },
    toggle() {
      this.$refs.alert.toggle();
      this.errorMsg = "";
    },
    credentialsCheck() {
      if (
        this.registrationCredentials.password ===
          this.registrationCredentials.passwordAgain &&
        this.registrationCredentials.password != "" &&
        this.registrationCredentials.passwordAgain != ""
      ) {
        if (
          this.registrationCredentials.lastname != "" &&
          this.registrationCredentials.firstname != ""
        ) {
          //this.toggle();
          this.register();
        } else {
          this.errorMsg = "Fill the first and last name fields.";
        }
      } else {
        this.errorMsg = "The given passwords do not match.";
      }
    },
    register() {
      auth
        .createUserWithEmailAndPassword(
          this.registrationCredentials.email,
          this.registrationCredentials.password
        )
        .then(() => {
          auth.currentUser
            .updateProfile({
              displayName: this.registrationCredentials.firstname.concat(
                " ",
                this.registrationCredentials.lastname
              ),
              photoURL: "https://i.stack.imgur.com/34AD2.jpg",
            })
            .then(() => {
              //kellett a kurva then ide, ezért nem frissült a retkes oldal a névvel login utan
              db.collection("users").doc().set({
                isAdmin: false,
                createdOn: Date.now(),
                lastSignedIn: Date.now(),
                userEmail: auth.currentUser.email,
                userId: auth.currentUser.uid,
                userName: auth.currentUser.displayName,
                profPic: auth.currentUser.photoURL,
              });
              this.$store.commit("setUserLoggedIn", {
                name: auth.currentUser.displayName,
                photoUrl: auth.currentUser.photoURL,
                loggedIn: true,
              });
              this.$router.push("/");
            });
        })
        .catch((error) => {
          this.errorMsg = error.message;
          this.errorMsg.concat(" ", error.code);
        });
    },
  },
};
</script>

<style scoped>
</style>