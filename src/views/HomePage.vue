<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        We will find a way.
        <br />We always have.
      </div>
    </ImgBanner>
    <v-container>
      <!-- About Me -->
      <v-layout my-5>
        <v-flex xs12 md8>
          <h2 class="headline mb-3">About Me</h2>
          <p class="mr-4">
            안녕하세요, 여러분!
            <br />프론트엔드 개발자를 꿈꾸는 학생입니다. 지금은 vue.js를 배우고
            있어요. <br />아직 미숙하지만 언젠가는 잘 할수 있을거라 믿습니다.
            정말 신기하고 재미있네요!
          </p>
        </v-flex>
        <v-flex md4>
          <v-img :src="getImgUrl('myprofile.jpg')" aspect-ratio="1.5" />
        </v-flex>
      </v-layout>

      <!-- Portfolio -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Portfolio</h2>
          <PortfolioList></PortfolioList>
        </v-flex>
      </v-layout>

      <!-- Post -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Post</h2>
          <PostList :column="2"></PostList>
        </v-flex>
      </v-layout>

      <!-- Github -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Project</h2>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import RepositoryList from "../components/RepositoryList";

export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .xs12 {
    text-align: center;
  }
  .xs12 .mr-4 {
    margin-right: 0px !important;
  }
}
</style>
