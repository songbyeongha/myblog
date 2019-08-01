<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex xs11 v-for="i in comments.length" :key="i.cid" class="comments">
        <v-card>{{ comments[i - 1] }}</v-card>
      </v-flex>
      <v-flex xs11 text-xs-center>
        <v-btn
          color="info"
          dark
          icon
          flat
          v-on:click="loadBeforeComment()"
          text-xs-center
          :disabled="currentPage === 1"
        >
          <v-icon>navigate_before</v-icon>
        </v-btn>
        {{ currentPage }}
        <v-btn
          color="info"
          dark
          icon
          flat
          v-on:click="loadAfterComment()"
          text-xs-center
          :disabled="!nextPage"
        >
          <v-icon>navigate_next</v-icon>
        </v-btn>
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
      comments: [],
      currentPage: 1,
      nextPage: true
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.comments = await fbservice.getInitComments(
        "portfolios",
        this.$route.params.did
      );
      this.CanLoadNextComment();
    },
    addComment() {
      fbservice.postComment(
        "portfolios",
        this.$route.params.did,
        store.state.userName,
        store.state.userEmail,
        this.text
      );
      this.text = "";
      this.initialize();
    },
    async loadAfterComment() {
      let temp = await fbservice.getAfterCommentsPage(
        "portfolios",
        this.$route.params.did,
        new Date(this.comments[this.comments.length - 1].created_at)
      );
      if (temp.length >= 1) {
        this.comments = temp;
        this.currentPage = this.currentPage + 1;
      }
      this.CanLoadNextComment();
    },
    async loadBeforeComment() {
      if (this.currentPage === 1) {
        return;
      }
      this.comments = await fbservice.getBeforeCommentsPage(
        "portfolios",
        this.$route.params.did,
        new Date(this.comments[0].created_at)
      );
      this.currentPage = this.currentPage - 1;
      this.nextPage = true;
    },
    async CanLoadNextComment() {
      let next = await fbservice.getAfterCommentsPage(
        "portfolios",
        this.$route.params.did,
        new Date(await this.comments[this.comments.length - 1].created_at)
      );
      if (next.length < 1) {
        this.nextPage = false;
      } else {
        this.nextPage = true;
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
.comments,
.input {
  padding-top: 5px;
}
</style>
