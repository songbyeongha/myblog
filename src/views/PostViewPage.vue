<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout class="post" justify-center row wrap>
          <v-flex xs11 v-if="loaded">
            <v-card>
              <v-card-title>
                <div class="headline">{{ getPost.title }}</div>
                <span class="grey--text subText">{{ getDate }}</span>
                <span class="grey--text subText">{{ getPost.name }}</span>
                <br />
                <span v-html="compiledMarkdown" class="subText"></span>
              </v-card-title>
              <v-card-actions>
                <v-btn flat color="orange" v-if="userCheck">수정</v-btn>
                <v-btn flat color="orange" v-if="userCheck">삭제</v-btn>
              </v-card-actions>
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
  name: "viewPost",
  components: {
    comment
  },
  data() {
    return {
      post: {
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
      this.post = await fbservice.getOnePost(id);
    }
  },
  computed: {
    getPost() {
      return this.post;
    },
    compiledMarkdown() {
      return marked(this.post.body);
    },
    userCheck() {
      return this.post.email==store.state.userEmail||store.state.rank=="admin";
    },
    getDate() {
      return this.$moment(this.post.created_at).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style scoped>
.post {
  margin-top: 5%;
}
.headline{
    text-align: center;
    background-color: #37474f;
    color: #f5f5f5;
    padding: 2px 14px;
    border-radius: 6px;
}
</style>
