<template>
  <v-layout class="portfolio" justify-center row wrap>
    <v-flex xs11>
      <v-card>
        <v-img
          class="white--text"
          aspect-ratio="1.7"
          :src="getPortfolio.img"
        ></v-img>
        <v-card-title>
          <div>
            <div class="headline">{{ getPortfolio.title }}</div>
            <span class="grey--text">{{ getPortfolio.name }}</span>
            <br />
            <span v-html="compiledMarkdown"></span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" v-if="getuser">수정</v-btn>
          <v-btn flat color="orange" v-if="getuser">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import store from "../store";

export default {
  name: "viewPortfolio",
  components: {},
  data() {
    return {
      portfolio: null
    };
  },
  mounted() {},
  methods: {
    initialize() {}
  },
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

<style scoped>
.portfolio {
  margin-top: 5%;
  margin-bottom: 5%;
}
.comments,
.input {
  margin-top: 1%;
}
.comments {
  padding: 10px;
}
</style>
