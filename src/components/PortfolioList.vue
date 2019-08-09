<template>
  <v-layout mt-5 wrap>
    <v-flex
      v-for="i in portfolios.length > limits ? limits : portfolios.length"
      xs12
      md6
      lg4
      :key="i"
    >
      <Portfolio
        v-if="checkLoaded"
        class="ma-3"
        :date="portfolios[i - 1].modify_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgSrc="portfolios[i - 1].img"
        @click.native="viewThis(portfolios[i - 1])"
      ></Portfolio>
    </v-flex>
    <v-progress-linear :indeterminate="true" v-if="!checkLoaded"></v-progress-linear>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePortfolios">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolio from "@/components/Portfolio";
import FirebaseService from "@/services/FirebaseService";
import store from "../store";

export default {
  name: "PortfoliosList",
  props: {
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      portfolios: [],
      limits: 6,
      checkLoaded: false
    };
  },
  components: {
    Portfolio
  },
  mounted() {
    this.getPortfolios();
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
      this.checkLoaded = await true;
    },
    loadMorePortfolios() {
      this.limits = this.limits + 6;
    },
    viewThis(portfolio) {
      this.$router.push("/viewPortfolio/" + portfolio.did);
    }
  }
};
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
