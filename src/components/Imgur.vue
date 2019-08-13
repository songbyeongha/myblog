<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 mg12 lg12 text-xs-center tit style="line-height:4rem;">
        <h2>Image Upload</h2>
      </v-flex>
      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
        <img :src="imageUrl" width="100%" v-if="imageUrl" />
        <v-text-field
          label="Click Here to Select Image"
          @click="pickFile"
          v-model="imageName"
          prepend-icon="attach_file"
          readonly
        ></v-text-field>
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        />
        <div class="text-xs-center" v-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
        <span v-if="showImg" v-html="imgurLink"></span>
        <div class="text-xs-center" style="margin-bottom: 2.5rem;">
          <v-btn round color="primary" small dark @click="uploadImg">Upload</v-btn>
          <v-btn round color="primary" small dark @click="doCopy" v-if="showImg">Copy!</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Imgur",
  components: {},
  data() {
    return {
      imageName: "",
      imageUrl: "",
      imageFile: "",
      imgurLink: "",
      accessToken: "d0b4346cb919cb9676c6f9a485576f98885c212d",
      refreshToken: "7fd83cb8f3a1f44cedbe9e769e1dcf4be8b80662",
      acount_id: "110804443",
      clientId: "45b8c2ebe400ae8",
      clientSecret: "2d7e9f3a23e639663bc2ba8949410e7de8940d9a",
      Imgurdata: null,
      Album: [],
      selected: false,
      uploaded: false,
      loading: false
    };
  },
  mounted() {},
  computed: {
    available() {
      return this.uploaded;
    },
    showImg() {
      return !this.loading && this.uploaded;
    }
  },
  methods: {
    pickFile() {
      this.imgurLink = "";
      this.uploaded = false;
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
        });
      } else {
        this.imageName = "";
        this.imageUrl = "";
        this.imageFile = "";
      }
    },
    uploadImg() {
      if (!this.imageUrl) {
        alert("이미지를 선택해주세요.");
        return;
      }
      this.loading = true;
      let form = new FormData();
      form.append("image", this.imageFile);

      let settings = {
        url: "https://api.imgur.com/3/image",
        method: "POST",
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
          this.imgurLink = response.data.data.link;
          this.loading = false;
          this.uploaded = true;
        })
        .catch(() => {
          alert("이미지 업로드 실패");
        });
    },
    doCopy() {
      this.$copyText(this.imgurLink).then(
        function(e) {
          alert("Copied");
        },
        function(e) {
          alert("Can not copy");
        }
      );
    }
  }
};
</script>

<style></style>
