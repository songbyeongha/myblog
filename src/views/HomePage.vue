<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        We will find a way.
        <br />We always have.
      </div>
    </ImgBanner>

    <v-container>
      <!-- About Members -->
      <v-layout my-5>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">About Members</h2>
          <AboutMembers></AboutMembers>
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
import AboutMembers from "../components/AboutMembers";
export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    AboutMembers
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
