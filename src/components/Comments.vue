<template>
  <div>
    <v-layout row wrap justify-center v-if="checkLoaded">
      <h1>COMMENTS</h1>
      <v-flex
        xs11
        v-for="i in comments.length"
        :key="i.cid"
        class="comments"
        overflow-hidden
      >
        <v-layout row wrap>
          <v-flex d-flex xs4 md2>
            <v-card>
              <v-card-title>
                <div>
                  <div>{{ comments[i - 1].name }}</div>
                  <div
                    class="grey--text"
                    v-text="getDate(comments[i - 1].created_at)"
                  ></div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex d-flex xs8 md10>
            <v-card :class="{ overflow: overFlowed[i - 1] }">
              <v-card-title class="commentText">
                <div
                  v-html="getText(comments[i - 1].text)"
                  class="hiddentext"
                ></div>
              </v-card-title>
              <v-card-actions text-xs-right class="commentManage">
                <v-layout justify-start>
                  <v-btn
                    v-if="overFlowed[i - 1]"
                    small
                    flat
                    color="orange"
                    @click="toggleOverFlow(i - 1)"
                    >더보기</v-btn
                  >
                  <v-btn
                    v-else
                    small
                    flat
                    color="orange"
                    @click="toggleOverFlow(i - 1)"
                    >접기</v-btn
                  >
                </v-layout>
                <v-layout justify-end>
                  <v-btn small flat color="orange" v-if="isWriter(i - 1)"
                    >수정</v-btn
                  >
                  <v-btn small flat color="orange" v-if="isWriter(i - 1)"
                    >삭제</v-btn
                  >
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
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
        <div v-if="!nocomments">{{ currentPage }}</div>
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
          label="댓글 쓰기"
          v-model="text"
        ></v-textarea>
        <v-layout justify-end>
          <v-btn color="primary" to="/portfolio">목록으로</v-btn>
          <v-btn color="primary" @click="addComment()">작성</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-progress-linear
      :indeterminate="true"
      v-if="!checkLoaded"
    ></v-progress-linear>
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
      nextPage: true,
      overFlowed: [],
      bool: true,
      loaded: false,
      nocomments: false
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
      if (this.comments.length === 0) {
        this.nocomments = true;
      }
      for (let i = 0; i < this.comments.length; i++) {
        this.overFlowed.push(true);
      }
      this.CanLoadNextComment();
      if (this.$store.state.userName) {
        this.canWrite = true;
      }
      this.loaded = true;
    },
    addComment() {
      if (!this.canWrite) {
        alert("로그인이 필요한 기능입니다.");
        return;
      }
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
      if (this.comments.length === 0) {
        this.nextPage = false;
        return;
      }
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
    },
    getDate(date) {
      return this.$moment(date).format("YYYY-MM-DD HH:mm");
    },
    getText(text) {
      return text.split("\n").join("<br />");
    },
    toggleOverFlow(index) {
      this.$set(this.overFlowed, index, !this.overFlowed[index]);
    },
    isWriter(i) {
      return this.$store.state.userEmail === this.comments[i].email;
    }
  },
  computed: {
    checkLoaded() {
      return this.loaded;
    }
  }
};
</script>

<style scoped>
.comments,
.input {
  padding-top: 5px;
}
.overflow .commentText {
  height: 70px;
}
.overflow .commentManage {
  height: 30px;
}
.overflow .commentText .hiddentext {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
