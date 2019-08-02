<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        Write Post
        <br />
      </div>
    </ImgBanner>
    <div class="container">
      <v-layout row wrap>
        <v-flex xs3 mg1 lg1 text-xs-center tit>
          <h2>Title</h2>
        </v-flex>
        <v-flex xs9 mg11 lg11>
          <v-text-field
            label="Title"
            single-line
            outline
            v-model="title"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <markdown-editor v-model="input"></markdown-editor>
      <div class="text-xs-center">
        <v-btn round color="primary" dark @click="send()">Add</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ImgBanner from "../components/ImgBanner";
import Editor from "v-markdown-editor";
import FirebaseService from "@/services/FirebaseService";
import store from "../store.js";
import firebase from "firebase/app";
import router from "../router";

Vue.use(Editor);

export default {
  name: "AddPost",
    components: {
    ImgBanner
  },
  data() {
    return {
      input: "# Post",
      title: "",
    };
  },
  computed: {
    getUser() {
      return firebase.auth().currentUser;
    }
  },
  methods: {
    send() {
      FirebaseService.postPost(
        this.title,
        this.input,
        this.getUser.email,
        this.getUser.displayName
      );
      this.$router.push("/post");
    }
  }
};
</script>

<style scoped>
.tit {
  line-height: 4rem;
}
</style>
