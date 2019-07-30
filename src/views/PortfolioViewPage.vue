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
          <v-btn flat color="orange">수정</v-btn>
          <v-btn flat color="orange">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs11>
      <v-card v-for="i in comments.length" :key="i" class="comments">
        <v-flex>{{ getPortfolio.email }}</v-flex>
      </v-card>
    </v-flex>
    <v-flex xs11 class="input">
      <v-textarea
        outline
        label="Outline textarea"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
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
      portfolio: null,
      comments: [
        {
          name: "shin",
          text: "meme",
          id: "aasdf",
          date: "01010"
        }
      ]
    };
  },
  mounted() {},
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
