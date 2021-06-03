import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase/config.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userLoggedIn: false,
    userName: "",
    userPhoto: "",
    messages: [],
    users: [],
  },
  mutations: {
    setUserLoggedIn(state, payload) {
      state.userLoggedIn = payload.loggedIn;
      state.userName = payload.name;
      state.userPhoto = payload.photoUrl;
    },
    setUserLoggedOut(state) {
      state.userLoggedIn = "";
      state.userName = "";
      state.userPhoto = "";
    },
    setMessages(state, payload) {
      state.messages = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    fetchCollection({ commit }) {
      db.collection("posts")
        .orderBy("createdAt")
        .onSnapshot((snap) => {
          var messages = [];
          snap.docs.forEach((doc) => {
            doc.data().createdAt &&
              messages.push({ ...doc.data(), id: doc.id });
          });
          commit("setMessages", messages);
        });
    },
    fetchUsers({ commit }) {
      db.collection("users")
        .orderBy("createdOn")
        .onSnapshot((snap) => {
          var users = [];
          snap.docs.forEach((doc) => {
            doc.data().createdOn && users.push({ ...doc.data(), id: doc.id });
          });
          commit("setUsers", users);
        });
    }
  },
  modules: {},
  getters: {}
});

export default store;
