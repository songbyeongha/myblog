<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 mg12 lg12 text-xs-center tit style="line-height:4rem;">
        <h2>Image Upload</h2>
      </v-flex>
      <v-flex xs12 mg12 lg12>
        <v-radio-group v-model="selectedRadio" row>
          <v-radio
            v-for="item in radioItems"
            :key="item"
            :label="item"
            :value="item"
          ></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex
        v-if="selectedRadio === 'Upload'"
        xs12
        md12
        lg12
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
        <img :src="imageUrl" height="150" v-if="imageUrl" />
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
        <v-text-field v-if="imgurLink" v-model="imgurLink"></v-text-field>
        <div class="text-xs-center" style="margin-bottom: 2.5rem;">
          <v-btn round color="primary" dark @click="uploadImg">Upload</v-btn>
          <v-btn v-if="available" round color="pink" dark @click="addImgToAlbum"
            >Add to Album</v-btn
          >
        </div>
      </v-flex>
      <v-flex
        v-if="selectedRadio === 'Delete'"
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
                md4
                lg3
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
        <img :src="Imgurdata.link" height="150" v-if="selected" />
        <div
          class="text-xs-center"
          style="margin-bottom: 2.5rem;"
          v-if="selected"
        >
          <v-btn round color="pink" dark @click="deleteImg">Delete</v-btn>
          <v-btn round color="primary" dark @click="another">Another</v-btn>
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
      selectedRadio: "",
      radioItems: ["Upload", "Delete"],
      imageName: "",
      imageUrl: "",
      imageFile: "",
      imgurLink: "",
      accessToken: "d0b4346cb919cb9676c6f9a485576f98885c212d",
      refreshToken: "7fd83cb8f3a1f44cedbe9e769e1dcf4be8b80662",
      acount_id: "110804443",
      clientId: "45b8c2ebe400ae8",
      clientSecret: "2d7e9f3a23e639663bc2ba8949410e7de8940d9a",
      albumDeleteHash: "kOA1XvMpnAQy5L2",
      albumId: "UlUclkt",
      Imgurdata: null,
      Album: [],
      selected: false,
      uploaded: false
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
      .catch(() => {
        alert("앨범 이미지 가져오기 실패");
      });
  },
  computed: {
    available() {
      return this.uploaded;
    }
  },
  methods: {
    pickFile() {
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
          this.Imgurdata = response.data.data;
          this.uploaded = true;
        })
        .catch(() => {
          alert("이미지 업로드 실패");
        });
    },
    addImgToAlbum() {
      if (!this.Imgurdata.id) {
        alert("이미지를 먼저 업로드 해주세요!");
        return;
      }

      let form = new FormData();
      form.append("deletehashes[]", this.Imgurdata.deletehash);

      var settings = {
        url: "https://api.imgur.com/3/album/" + this.albumDeleteHash + "/add",
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
        .then(() => {
          alert("이미지를 앨범에 추가하였습니다.");
        })
        .catch(() => {
          alert("앨범에 이미지 추가 실패");
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
        .catch(() => {
          alert("앨범 이미지 가져오기 실패");
        });
    },
    selectImg(img) {
      this.Imgurdata = img;
      this.selected = true;
    },
    deleteImg() {
      if (!this.Imgurdata.id) {
        alert("삭제할 이미지를 선택해주세요.");
        return;
      }

      let form = new FormData();
      form.append("ids[]", this.Imgurdata.id);
      let settings = {
        url: "https://api.imgur.com/3/image/" + this.Imgurdata.id,
        method: "DELETE",
        timeout: 0,
        headers: {
          Authorization: "Bearer " + this.accessToken
        },
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: form
      };
      axios(settings)
        .then(() => {
          alert("앨범에서 해당 이미지를 삭제하였습니다.");
        })
        .catch(() => {
          alert("앨범 이미지 삭제 실패");
        });
    },
    another() {
      this.selected = false;
    }
  }
};
</script>

<style></style>
