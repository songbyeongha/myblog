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
      <img :src="imageUrl" height="150" v-if="imageUrl" />
    </v-flex>
    <v-flex
      v-if="selectedRadio === 'From Album'"
      xs12
      md12
      lg12
      class="text-xs-center text-sm-center text-md-center text-lg-center"
    >
      <v-card class="scroll" v-if="selected === false">
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              xs6
              md6
              lg6
              v-for="img in Album"
              :key="img.id"
              class="imgcard"
              @click="selectImg(img)"
            >
              <v-card>
                <v-img :src="img.link" aspect-ratio="1.5"></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <img :src="getImgUrl" width="150" height="100" v-if="imageUrl" />
      <div
        v-if="selected"
        class="text-xs-center"
        style="margin-bottom: 2.5rem;"
      >
        <v-btn round color="primary" dark @click="selected = false"
          >Another</v-btn
        >
      </div>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store.js";

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
      radioItems: ["Random", "From Album"],
      imgurLink: "",
      clientId: "45b8c2ebe400ae8",
      clientSecret: "2d7e9f3a23e639663bc2ba8949410e7de8940d9a",
      albumDeleteHash: "kOA1XvMpnAQy5L2",
      albumId: "UlUclkt",
      Imgurdata: null,
      Album: [],
      selected: false
    };
  },
  mounted() {
    let form = new FormData();

    var settings = {
      url: "https://api.imgur.com/3/album/" + this.albumId + "/images",
      method: "GET",
      timeout: 0,
      headers: {
        Authorization: "Client-ID " + this.clientId
      },
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form
    };
    axios(settings)
      .then(response => {
        this.Album = response.data.data;
      })
      .catch(ex => {
        console.log("err", ex);
        console.log(this.imageUrl);
        alert("앨범 이미지 가져오기 실패");
      });
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
        } else {
          store.state.imgUrl = "";
          store.state.imgUrl =
            "https://source.unsplash.com/random/" +
            Math.floor(Math.random() * 600) +
            800;
        }
        this.imageUrl = this.getImgUrl;
        this.selected = false;
        this.$emit("imgSelected");
      } else {
        this.imageUrl = "";
      }
    },
    getImgData(data) {
      this.imageName = data.imageName;
      this.imageUrl = data.imageUrl;
      this.imageFile = data.imageFile;
    },
    createAlbum() {
      let form = new FormData();
      form.append("title", "My Blog album");
      form.append("description", "This album is test album");
      var settings = {
        url: "https://api.imgur.com/3/album",
        method: "POST",
        timeout: 0,
        headers: {
          Authorization: "Client-ID 45b8c2ebe400ae8"
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form
      };
      axios(settings)
        .then(response => {
          console.log(response);
        })
        .catch(ex => {
          console.log("err", ex);
          console.log(this.imageUrl);
          alert("앨범 추가 실패");
        });
    },
    getAlbumImages() {
      let form = new FormData();

      var settings = {
        url: "https://api.imgur.com/3/album/" + this.albumId + "/images",
        method: "GET",
        timeout: 0,
        headers: {
          Authorization: "Client-ID " + this.clientId
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form
      };
      axios(settings)
        .then(response => {
          this.Album = response.data.data;
        })
        .catch(ex => {
          console.log("err", ex);
          console.log(this.imageUrl);
          alert("앨범 이미지 가져오기 실패");
        });
    },
    selectImg(img) {
      if (this.mode === "banner") {
        store.state.bannerImgUrl = img.link;
      } else {
        store.state.imgUrl = img.link;
      }
      this.imageUrl = this.getImgUrl;
      this.selected = true;
      this.$emit("imgSelected");
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
