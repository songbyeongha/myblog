<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        {{ bannerText }}
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
        <v-btn v-if="mode == 'write'" round color="primary" dark @click="send()"
          >Add</v-btn
        >
        <v-btn
          v-if="mode == 'modify'"
          round
          color="primary"
          dark
          @click="modify()"
          >modify</v-btn
        >
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
import firebase from "firebase/app";
import router from "../router";

Vue.use(Editor);

export default {
  name: "AddPortfolioPage",
  components: {
    ImgBanner,
    ImgTool
  },
  data() {
    return {
      portfolio: {
        img: "",
        body: "",
        email: "",
        name: "",
        title: "",
        created_at: ""
      },
      bannerText: "",
      input: "",
      title: "",
      imageName: "",
      imageUrl: "",
      imageFile: "",
      mode: ""
    };
  },
  mounted() {
    if (this.$route.params.mode == "write") {
      this.bannerText = "Write Portfolio";
      this.mode = "write";
    } else {
      this.bannerText = "Modify Portfolio";
      this.mode = "modify";
      this.initialize();
    }
  },
  computed: {
    getUser() {
      return firebase.auth().currentUser;
    }
  },
  methods: {
    getImgURL() {
      this.imageUrl = store.state.imgUrl;
    },
    send() {
      if (
        !(
          this.$store.state.rank === "admin" ||
          this.$store.state.rank === "team"
        )
      ) {
        alert("권한이 필요한 기능입니다.");
      }
      FirebaseService.postPortfolio(
        this.title,
        this.input,
        this.imageUrl,
        this.getUser.email,
        this.getUser.displayName
      );
      this.$router.push("/portfolio");
    },
    modify() {
      FirebaseService.modifyPortfolio(
        this.$route.params.mode,
        this.title,
        this.input,
        this.imageUrl,
        this.getUser.email,
        this.getUser.displayName
      );
      this.$router.push("/portfolio");
    },
    async initialize() {
      let id = this.$route.params.mode;
      this.portfolio = await FirebaseService.getOnePortfolio(id);
      this.title = this.portfolio.title;
      this.input = this.portfolio.body;
      this.imageUrl = this.portfolio.img;
      console.log(this.imageUrl);
    }
  }
};
</script>

<style scoped>
.tit {
  line-height: 4rem;
}
</style>
