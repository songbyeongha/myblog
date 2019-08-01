<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">Post</div>
    </ImgBanner>
    <v-container>
      <v-btn block color="primary" :to="addlink" dark>Write Post</v-btn>
      <!-- Post -->
      <v-layout>
        <v-flex xs12>
          <PostList :limits="cnt" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PostList from "../components/PostList";

export default {
  name: "PostPage",
  props: {
    cnt: PostList.limits
  },
  data() {
    return {
      addlink: "/post-add"
    };
  },
  components: {
    ImgBanner,
    PostList
  }
};
</script>

<style scoped></style>
