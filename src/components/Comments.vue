<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex xs11 v-for="i in comments.length" :key="i.cid" class="comments">
        <v-card>{{ comments[i - 1] }}</v-card>
      </v-flex>
      <v-flex xs11 class="input">
        <v-textarea
          height="100"
          outline
          label="Add Comment"
          v-model="text"
        ></v-textarea>
        <v-btn color="primary" @click="addComment()">작성</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import store from "../store";
import fbservice from "../services/FirebaseService";

export default {
  name: "Comments",
  data() {
    return {
      canWrite: false,
      text: "",
      comments: []
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.comments = await fbservice.getComments(
        "portfolios",
        this.$route.params.did
      );
      console.log(this.comments);
    },
    addComment() {
      fbservice.postComment(
        "portfolios",
        this.$route.params.did,
        store.state.userName,
        store.state.userEmail,
        this.text
      );
    }
  },
  computed: {}
};
</script>

<style>
.comments,
.input {
  padding-top: 5px;
}
</style>
