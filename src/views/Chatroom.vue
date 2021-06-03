<template>
  <div>
    <v-card max-width="600px" class="mx-auto" elevation="2">
      <v-card-text>
        <v-list max-height="400px" class="overflow-y-auto" ref="chatList">
          <v-list-item
            v-for="item in messages"
            :key="item.message"
            :class="whichSide(item)"
          >
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-avatar
                  v-bind="attrs"
                  v-on="on"
                  v-if="hideIcon(item)"
                >
                  <v-img :src="item.profPic"></v-img>
                </v-list-item-avatar>
              </template>
              <span>{{ item.sender }}</span> <br />
              <span>{{ item.createdAt }}</span>
            </v-tooltip>

            <v-list-item-content>
              <v-list-item-title class="text-wrap">
                <!-- <v-chip color="primary"> -->
                <strong>{{ item.sender }} </strong> <br />{{ item.message }}
                <!-- </v-chip> -->
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon
                  small
                  :color="item.liked ? 'red' : 'default'"
                  @click="liked(item.id, item.liked)"
                  >mdi-heart</v-icon
                >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col>
            <div class="d-flex flex-row align-center ma-1 ml-6">
              <v-text-field
                placeholder="Type Something"
                v-model="message"
                @keyup.enter="sendMessage()"
              ></v-text-field>
              <v-btn
                class="ml-4 mb-2 mr-6"
                color="primary"
                @click="sendMessage()"
                >Send</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { db } from "../firebase/config.js";
import { auth } from "../firebase/config.js";
export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    },
    profPic() {
      return this.$store.state.userPhoto;
    },
  },
  methods: {
    sendMessage() {
      db.collection("posts").doc().set({
        createdAt: new Date().toISOString(),
        message: this.message,
        sender: auth.currentUser.displayName,
        profPic: this.profPic,
        liked: false,
        uid: auth.currentUser.uid,
      });
      this.message = "";
    },
    liked(id, liked) {
      db.collection("posts").doc(id).update({ liked: !liked });
    },
    scrollToEnd() {
      this.$refs.chatList.$el.scrollTop = this.$refs.chatList.$el.scrollHeight;
      //$el nélkül nem ment, néha kell néha nem, bruh
    },
    //CLASS BINDINGS HERE
    whichSide(item) {
      if (auth.currentUser.uid == item.uid) {
        return "text-right";
      }
    },
    hideIcon(item) {
      if (auth.currentUser.uid != item.uid) {
        return true;
      }
    },
  },
  created() {
    this.$store.dispatch("fetchCollection");
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>

<style>
</style>