<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        We will find a way.
        <br />We always have.
      </div>
    </ImgBanner>
    <v-container>
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">About Team</h2>
          <AboutTeam></AboutTeam>
        </v-flex>
      </v-layout>
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Portfolio</h2>
          <PortfolioList></PortfolioList>
        </v-flex>
      </v-layout>
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Post</h2>
          <PostList :column="2"></PostList>
        </v-flex>
      </v-layout>
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
import AboutTeam from "../components/AboutTeam";
export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    AboutTeam
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
