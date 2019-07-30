<template>
  <v-layout class="portfolio" justify-center>
    <v-flex xs11>
      <v-card>
        <v-img class="white--text" aspect-ratio="1.7" :src="getPortfolio.img">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-content-center flexbox>
                <span class="headline">{{ getPortfolio.title }}</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-card-title>
          <div>
            <span class="grey--text">{{ getPortfolio.name }}</span>
            <br />
            <span v-html="compiledMarkdown">Whitehaven Beach</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange">Share</v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../store";

export default {
  name: "viewPortfolio",
  data() {
    return {
      portfolio: null
    };
  },
  methods: {},
  computed: {
    getPortfolio() {
      return store.state.portfolio;
    },
    compiledMarkdown() {
      console.log(this.getPortfolio);
      return marked(this.getPortfolio.body);
    }
  }
};
</script>

<style scoped>
.portfolio {
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
