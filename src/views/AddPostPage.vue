<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        {{bannerText}}
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
        <v-btn v-if="mode=='write'" round color="primary" dark @click="send()">Add</v-btn>
        <v-btn v-if="mode=='modify'" round color="primary" dark @click="modify()">modify</v-btn>
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
      post: {
        body: "",
        email: "",
        name: "",
        title: "",
        created_at: ""
      },
      bannerText : "",
      input: "",
      title: "",
      mode:""
    };
  },
  mounted(){
    if(this.$route.params.mode=="write"){
      this.bannerText = "Write Post";
      this.mode = "write";
    }else{
      this.bannerText = "Modify Post";
      this.mode = "modify";
      this.initialize();
    }
  },
  computed: {
    getUser() {
      return firebase.auth().currentUser;
    },
    getPost() {
      return this.post;
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
    },
    modify(){
      FirebaseService.modifyPost(
        this.$route.params.mode,
        this.title,
        this.input,
        this.getUser.email,
        this.getUser.displayName
      );
      this.$router.push("/post");
    },
    async initialize() {
      let id = this.$route.params.mode;
      this.post = await FirebaseService.getOnePost(id);
      this.title = this.post.title;
      this.input = this.post.body;
    }
  }
};
</script>

<style scoped>
.tit {
  line-height: 4rem;
}
</style>
