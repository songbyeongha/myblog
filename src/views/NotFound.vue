<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        404 Not Found.
        <br />
        <br />주소가 정확한지
        <br />확인해 보세요.
      </div>
    </ImgBanner>
    <v-container>
      <v-btn block color="primary" @click="goback()">이전 페이지로</v-btn>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
export default {
  name: "NotFound",
  data() {
    return {};
  },
  components: {
    ImgBanner
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>

<style></style>
