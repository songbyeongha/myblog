<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        Write Portfolio
        <br />
      </div>
    </ImgBanner>
    <div class="container">
      <ImgTool mode="port" @imgSelected="getImgURL"></ImgTool>
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
import ImgTool from "../components/ImageTool";
import store from "../store.js";

Vue.use(Editor);

export default {
  name: "AddPortfolioPage",
  components: {
    ImgBanner,
    ImgTool
  },
  data() {
    return {
      input: "# hello",
      title: "",
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  methods: {
    getImgURL() {
      this.imageUrl = store.state.imgUrl;
      console.log(this.imgUrl);
    },
    send() {
      FirebaseService.postPortfolio(this.title, this.input, this.imageUrl);
      window.location.href = "/portfolio";
    }
  }
};
</script>

<style scoped>
.tit {
  line-height: 4rem;
}
</style>
