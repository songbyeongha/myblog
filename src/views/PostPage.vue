<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">Post</div>
    </ImgBanner>
    <v-container>
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
  components: {
    ImgBanner,
    PostList
  }
};
</script>

<style scoped></style>
