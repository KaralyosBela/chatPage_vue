import Vue from "vue";
import VueRouter from "vue-router";
//import firebase from "../firebase/config.js";
import {auth} from "../firebase/config.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/signUp",
    name: "SignupPage",
    component: () => import("../views/SignupPage.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/SignIn",
    name: "SigninPage",
    component: () => import("../views/SigninPage.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/chatroom",
    name: "Chatroom",
    component: () => import("../views/Chatroom.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "UserSettings",
    component: () => import("../views/UserSettings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //az összes route meta propját végig fogja nézni
    if (auth.currentUser) {
      next();
      //console.log("current user is", auth.currentUser);
    } else {
      console.log(
        "You must be logged in to see this page",
        auth.currentUser
      );
      next({
        path: "SignIn",
      });
    }
  } else {
    next();
  }
});

export default router;
