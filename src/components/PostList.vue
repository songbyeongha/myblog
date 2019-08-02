<template>
  <v-layout mt-5 wrap>
    <v-flex
      v-for="i in posts.length > limits ? limits : posts.length"
      xs12
      sm6
      lg4
      px-3
      :key="i"
      class="noneCenter"
    >
      <Post
        class="ma-3"
        :date="posts[i - 1].created_at"
        :title="posts[i - 1].title"
        :body="posts[i - 1].body"
        @click.native="viewThis(posts[i - 1])"
      ></Post>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import Post from "@/components/Post";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      posts: [],
      limits: 6
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    },
    loadMorePosts() {
      this.limits = this.limits + 6;
    },
    viewThis(post) {
      this.$router.push("/viewPost/" + post.did);
    }
  }
};
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
.noneCenter {
  text-align: left;
}
</style>
