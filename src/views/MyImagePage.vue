<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        My Image
        <br />
      </div>
    </ImgBanner>
    <div class="container">
      <imgur></imgur>
    </div>
  </div>
</template>

<script>
import imgur from "../components/Imgur";
import ImgBanner from "../components/ImgBanner";

export default {
  name: "MyImagePage",
  components: {
    ImgBanner,
    imgur
  },
  data() {
    return {};
  }
};
</script>

<style></style>
