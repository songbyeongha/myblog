<template>
  <div>
    <v-layout class="portfolio" justify-center row wrap>
      <v-flex xs11 v-if="loaded">
        <v-card>
          <v-img
            class="white--text"
            aspect-ratio="1.7"
            :src="getPortfolio.img"
          ></v-img>
          <v-card-title>
            <div class="headline">{{ getPortfolio.title }}</div>
            <span class="grey--text">{{ getPortfolio.name }}</span>
            <br />
            <span v-html="compiledMarkdown"></span>
            <span class="grey--text">{{ getDate }}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" v-if="getUser">수정</v-btn>
            <v-btn flat color="orange" v-if="getUser">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <comment></comment>
  </div>
</template>

<script>
import store from "../store";
import fbservice from "../services/FirebaseService";
import comment from "../components/Comments";

export default {
  name: "viewPortfolio",
  components: {
    comment
  },
  data() {
    return {
      portfolio: {
        img: "",
        body: "",
        email: "",
        name: "",
        title: "",
        created_at: ""
      },
      loaded: false
    };
  },
  mounted() {
    this.initialize();
    this.loaded = true;
  },
  methods: {
    async initialize() {
      let id = this.$route.params.did;
      this.portfolio = await fbservice.getOnePortfolio(id);
    }
  },
  computed: {
    getPortfolio() {
      return this.portfolio;
    },
    compiledMarkdown() {
      return marked(this.portfolio.body);
    },
    getUser() {
      return this.portfolio.userName;
    },
    getDate() {
      return this.$moment(this.portfolio.created_at).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style scoped>
.portfolio {
  margin-top: 5%;
}
</style>
