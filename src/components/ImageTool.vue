<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 mg12 lg12 text-xs-center tit style="line-height:4rem;">
        <h2>Image</h2>
      </v-flex>
      <v-flex xs12 mg12 lg12>
        <v-radio-group v-model="selectedRadio" @click="radioChanged" row>
          <v-radio
            v-for="item in radioItems"
            :key="item"
            :label="item"
            :value="item"
          ></v-radio>
        </v-radio-group>
      </v-flex>
    </v-layout>
    <v-flex
      v-if="selectedRadio === 'Random'"
      xs12
      md12
      lg12
      class="text-xs-center text-sm-center text-md-center text-lg-center"
    >
      <v-img :src="imageUrl" aspect-ratio="1.7" v-if="imageUrl" />
    </v-flex>
    <v-flex
      v-if="selectedRadio === 'Default'"
      xs12
      md12
      lg12
      class="text-xs-center text-sm-center text-md-center text-lg-center"
    >
      <v-img :src="defaultImg" aspect-ratio="1.7" />
    </v-flex>
    <v-flex
      v-if="selectedRadio === 'From Link'"
      xs12
      md12
      lg12
      class="text-xs-center text-sm-center text-md-center text-lg-center"
    >
      <v-img :src="imageUrl" aspect-ratio="1.7" v-if="imageUrl" />
      <v-flex xs12>
        <v-text-field
          label="ex) https://source.unsplash.com/random"
          placeholder="input your image link here"
          v-model="imageUrl"
          outline
        ></v-text-field>
      </v-flex>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store.js";
import FirebaseService from "../services/FirebaseService";

export default {
  name: "ImageTool",
  components: {},
  props: {
    mode: { type: String }
  },
  data() {
    return {
      imageUrl: "",
      selectedRadio: "",
      radioItems: ["Random", "From Link"],
      imgurLink: "",
      clientId: "45b8c2ebe400ae8",
      clientSecret: "2d7e9f3a23e639663bc2ba8949410e7de8940d9a",
      albumDeleteHash: "kOA1XvMpnAQy5L2",
      albumId: "UlUclkt",
      Imgurdata: null,
      Album: [],
      selected: false,
      defaultImg: ""
    };
  },
  mounted() {
    this.radioItems.push("Default");
    if (this.$route.params.mode === "write") {
      this.defaultImg = store.state.bannerImgUrl;
    } else {
      this.getImage();
    }
  },
  computed: {
    getImgUrl() {
      if (this.mode === "banner") {
        return store.state.bannerImgUrl;
      } else {
        return store.state.imgUrl;
      }
    }
  },
  methods: {
    radioChanged() {
      if (this.selectedRadio === "Random") {
        if (this.mode === "banner") {
          store.state.bannerImgUrl = "";
          store.state.bannerImgUrl =
            "https://source.unsplash.com/collection/827743/" +
            Math.floor(Math.random() * 1600) +
            900;
        } else if (this.mode === "write") {
          store.state.imgUrl = "";
          store.state.imgUrl =
            "https://source.unsplash.com/random/" +
            Math.floor(Math.random() * 600) +
            800;
        } else if (this.mode === "modify") {
          store.state.imgUrl = "";
          store.state.imgUrl =
            "https://source.unsplash.com/random/" +
            Math.floor(Math.random() * 600) +
            800;
        }
        this.imageUrl = this.getImgUrl;
        this.selected = false;
      } else if (this.selectedRadio === "Default") {
        if (this.mode === "banner") {
          store.state.bannerImgUrl = this.defaultImg;
        } else if (this.mode === "modify") {
          store.state.imgUrl = this.defaultImg;
        } else if (this.mode === "write") {
          store.state.imgUrl = store.state.bannerImgUrl;
        }
      } else {
        this.imageUrl = "";
      }
      this.$emit("imgSelected");
    },
    async getImage() {
      let id = this.$route.params.mode;
      let portfolio = await FirebaseService.getOnePortfolio(
        this.$route.params.mode
      );
      this.defaultImg = portfolio.img;
    }
  }
};
</script>

<style>
.scroll {
  overflow-y: auto;
  height: 300px;
  margin-bottom: 20px;
}
.imgcard {
  cursor: pointer;
}
</style>
