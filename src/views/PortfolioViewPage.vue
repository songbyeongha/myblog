<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout class="portfolio" justify-center row wrap>
          <v-flex xs11 v-if="loaded">
            <v-card>
              <v-img class="white--text" aspect-ratio="1.7" :src="getPortfolio.img"></v-img>
              <v-card-title>
                <div class="headline">{{ getPortfolio.title }}</div>
                <span class="grey--text subText">{{ getPortfolio.name }}</span>
                <br />
                <span v-html="compiledMarkdown" class="subText"></span>
                <span class="grey--text subText">{{ getDate }}</span>
              </v-card-title>
              <v-card v-if="userCheck" class="buttonPlace">
                <v-btn color="primary" :to="addlink">수정</v-btn>
                <v-btn color="primary">삭제</v-btn>
              </v-card>
            </v-card>
          </v-flex>
        </v-layout>
        <comment></comment>
      </v-container>
    </v-content>
  </v-app>
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
        created_at: "",
        modify_at:""
      },
      loaded: false,
      userCheck: false,
      addlink: "/portfolio-add/" + this.$route.params.did
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
      if(this.portfolio.email == store.state.userEmail || store.state.rank == "admin"){
        this.userCheck=true;
      }
    }
  },
  computed: {
    getPortfolio() {
      return this.portfolio;
    },
    compiledMarkdown() {
      return marked(this.portfolio.body);
    },
    getDate() {
      return this.$moment(this.portfolio.modify_at).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style scoped>
.portfolio {
  margin-top: 5%;
}
.buttonPlace {
  text-align: center;
  padding: 15px 0px;
}
.buttonPlace button {
  color: #f5f5f5;
}
</style>
