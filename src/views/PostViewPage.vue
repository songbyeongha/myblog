<template>
  <v-app>
    <v-container>
      <v-layout class="post" justify-center row wrap>
        <v-flex xs11>
          <h1 class="contentHeadTitle">POST</h1>
        </v-flex>
        <v-flex xs11>
          <v-card>
            <v-card-title>
              <v-layout row wrap class="postTitle">
                <v-flex xs12 sm12 md8 class="pTitle">{{
                  getPost.title
                }}</v-flex>
                <v-flex xs12 sm12 md4 class="pWriter">
                  <span class="subText subDate"
                    >{{ getDate }} &nbsp;&nbsp;&nbsp; {{ getPost.name }}</span
                  >
                </v-flex>
              </v-layout>
              <br />
              <span
                v-html="compiledMarkdown"
                class="subText subTextarea"
              ></span>
            </v-card-title>
            <v-card v-if="userCheck" class="buttonPlace">
              <v-btn color="primary" :to="addlink">수정</v-btn>
              <v-btn color="primary" @click="deletePost()">삭제</v-btn>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      <comment page="posts"></comment>
    </v-container>
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
        created_at: "",
        modify_at: ""
      },
      userCheck: false,
      addlink: "/post-add/" + this.$route.params.did
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let id = this.$route.params.did;
      this.post = await fbservice.getOnePost(id);
      if (
        this.post.email == store.state.userEmail ||
        store.state.rank == "admin"
      ) {
        this.userCheck = true;
      }
    },
    async deletePost() {
      let conf = confirm("정말로 삭제하시겠습니까?");
      if (conf) {
        let path = "posts/" + this.$route.params.did;
        await fbservice.deleteAtPath(
          "post",
          this.$route.params.did,
          "posts/" + this.$route.params.did
        );
        alert("포스트를 삭제했습니다.");
        this.$router.replace("/post");
      }
    }
  },
  computed: {
    getPost() {
      return this.post;
    },
    compiledMarkdown() {
      return marked(this.post.body);
    },
    getDate() {
      return this.$moment(this.post.modify_at).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style scoped>
.contentHeadTitle {
  text-align: center;
  margin-bottom: 30px;
}
.post {
  margin-top: 5%;
}
.postTitle {
  background: #577b8d;
  color: #f5f5f5;
  text-align: left;
  padding: 2px 14px;
  border-radius: 6px;
}
.postTitle .pWriter {
  line-height: 45px;
}
.postTitle .pTitle {
  font-size: 30px;
  line-height: 40px;
}
.subDate {
  text-align: right;
  font-size: 15px;
}
.subName {
  text-align: right;
  font-size: 15px;
}
.subTextarea {
  background-color: #f5f5f5;
  color: #37474f;
  padding: 10px 20px;
  border-radius: 7px;
  margin-top: 10px;
  min-height: 300px;
}
.buttonPlace {
  text-align: center;
  padding: 15px 0px;
}
.buttonPlace button {
  color: #f5f5f5;
}
</style>
