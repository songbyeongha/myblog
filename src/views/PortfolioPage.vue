<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">Portfolio</div>
    </ImgBanner>
    <v-container>
      <v-btn v-if="userCheck" block color="primary" :to="addlink" dark>Write Portfolio</v-btn>
      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="cnt" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";

export default {
  name: "PortfolioPage",
  props: {
    cnt: PortfolioList.limits
  },
  data() {
    return {
      addlink: "/portfolio-add"
    };
  },
  components: {
    ImgBanner,
    PortfolioList
  },
  computed: {
    userCheck() {
      return (
        this.$store.state.rank == "team" || this.$store.state.rank == "admin"
      );
    }
  }
};
</script>

<style scoped></style>
