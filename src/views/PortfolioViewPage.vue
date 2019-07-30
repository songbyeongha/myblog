<template>
  <div v-html="compiledMarkdown"></div>
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
      return marked(this.getPortfolio.body);
    }
  }
};
</script>

<style></style>
