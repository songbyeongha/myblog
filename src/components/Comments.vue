<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-for="i in comments" :key="i" class="comments">
          <v-flex>{{ comments[i - 1] }}</v-flex>
        </v-card>
      </v-flex>
      <v-flex xs12 class="input">
        <v-textarea
          height="100"
          outline
          label="Add Comment"
          v-model="text"
        ></v-textarea>
      </v-flex>
      <v-flex xs2 offset-xs10>
        <v-btn color="primary" @click="addComment()">작성</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../store";
import fbservice from "../services/FirebaseService";

export default {
  name: "Comments",
  props: {
    comments: []
  },
  data() {
    return {
      canWrite: false,
      text: ""
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
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

<style></style>
