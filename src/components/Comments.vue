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
                <div v-if="comments[i - 1].deleted" class="grey--text">
                  삭제된 댓글입니다.
                </div>
                <div
                  v-else
                  v-html="getText(comments[i - 1].text)"
                  class="hiddentext"
                ></div>
              </v-card-title>
              <v-card-actions text-xs-right class="commentManage">
                <v-layout justify-start v-if="!comments[i - 1].deleted">
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
                <v-layout justify-end v-if="!comments[i - 1].deleted">
                  <v-btn
                    small
                    flat
                    color="orange"
                    v-if="canWrite"
                    @click="toggleEditing(i - 1, 'comment')"
                    >답글 달기</v-btn
                  >
                  <v-btn
                    small
                    flat
                    color="orange"
                    v-if="isWriter(i - 1)"
                    @click="toggleEditing(i - 1, 'update')"
                    >수정</v-btn
                  >
                  <v-btn
                    small
                    flat
                    color="orange"
                    v-if="isWriter(i - 1)"
                    @click="deleteComment(i - 1)"
                    >삭제</v-btn
                  >
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-flex xs12 v-if="originEditing[i - 1]">
          <v-card>
            <v-card-title class="commentText">
              <v-textarea
                height="70"
                outline
                label="댓글을 입력하세요"
                v-model="editText"
              ></v-textarea>
            </v-card-title>
            <v-layout justify-end>
              <v-btn
                small
                flat
                color="orange"
                v-if="canWrite"
                @click="updateComment(i - 1)"
                >완료</v-btn
              >
            </v-layout>
          </v-card>
        </v-flex>
        <template v-if="comments[i - 1].comments">
          <!--대댓글 -->
          <template>
            <v-flex
              xs11
              offset-xs1
              v-for="j in comments[i - 1].comments.length"
              :key="j.cid"
              class="comments"
            >
              <v-layout row wrap>
                <v-flex xs1>
                  <v-icon large>subdirectory_arrow_right</v-icon>
                </v-flex>
                <v-flex d-flex xs3 md2>
                  <v-card>
                    <v-card-title>
                      <div>
                        <div>{{ comments[i - 1].comments[j - 1].name }}</div>
                        <div
                          class="grey--text"
                          v-text="
                            getDate(comments[i - 1].comments[j - 1].created_at)
                          "
                        ></div>
                      </div>
                    </v-card-title>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs8 md9>
                  <v-card>
                    <v-card-title class="commentText">
                      <div
                        v-html="getText(comments[i - 1].comments[j - 1].text)"
                        class="hiddentext"
                      ></div>
                    </v-card-title>
                    <v-card-actions text-xs-right class="commentManage">
                      <v-layout justify-end>
                        <v-btn
                          small
                          flat
                          color="orange"
                          v-if="isCommentWriter(i - 1, j - 1)"
                          @click="toggleCommentEditing(i - 1, j - 1, 'update')"
                          >수정</v-btn
                        >
                        <v-btn
                          small
                          flat
                          color="orange"
                          v-if="isCommentWriter(i - 1, j - 1)"
                          @click="deleteCommentComment(i - 1, j - 1)"
                          >삭제</v-btn
                        >
                      </v-layout>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-flex xs12 v-if="editing[i - 1].editing[j - 1]">
                <v-card>
                  <v-card-title class="commentText">
                    <v-textarea
                      height="70"
                      outline
                      label="댓글을 입력하세요"
                      v-model="editText"
                    ></v-textarea>
                  </v-card-title>
                  <v-layout justify-end>
                    <v-btn
                      small
                      flat
                      color="orange"
                      v-if="canWrite"
                      @click="updateCommentComment(i - 1, j - 1)"
                      >완료</v-btn
                    >
                  </v-layout>
                </v-card>
              </v-flex>
            </v-flex>
          </template>
        </template>
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
        <span v-if="!nocomments">{{ currentPage }}</span>
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
      <h2 v-if="nocomments">등록된 댓글이 없습니다.</h2>
      <v-flex xs11 class="input">
        <v-textarea
          height="100"
          outline
          label="댓글 쓰기"
          v-model="text"
        ></v-textarea>
        <v-layout justify-end>
          <v-btn color="primary" :to="returnPage">목록으로</v-btn>
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
  props: {
    page: { type: String }
  },
  data() {
    return {
      canWrite: false,
      text: "",
      editText: "",
      comments: [],
      currentPage: 1,
      nextPage: true,
      overFlowed: [],
      bool: true,
      loaded: false,
      nocomments: false,
      originEditing: [],
      editing: [],
      mode: ""
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.editText = "";
      this.currentPage = 1;
      this.comments = await fbservice.getInitComments(
        this.page,
        this.$route.params.did
      );
      if (this.$store.state.userName) {
        this.canWrite = true;
      }
      if (this.comments.length === 0) {
        this.nocomments = true;
        this.loaded = true;
        this.nextPage = false;
        return;
      }
      if (this.comments.length > 0) {
        await this.getCommentsComments();
      }
      this.CanLoadNextComment();
      this.loaded = true;
    },
    addComment() {
      this.loaded = false;
      if (!this.canWrite) {
        alert("로그인이 필요한 기능입니다.");
        this.loaded = true;
        return;
      }
      fbservice.postComment(
        this.page,
        this.$route.params.did,
        store.state.userName,
        store.state.userEmail,
        this.text
      );
      this.text = "";
      this.initialize();
    },
    deleteComment(i) {
      let conf = confirm("댓글을 삭제하시겠습니까?");
      if (conf) {
        this.loaded = false;
        if (this.comments[i].comments) {
          fbservice.markDeltedComment(
            this.page,
            this.$route.params.did,
            this.comments[i].cid
          );
        } else {
          fbservice.deleteComment(
            this.page,
            this.$route.params.did,
            this.comments[i].cid
          );
        }
        this.initialize();
      }
    },
    deleteCommentComment(i, j) {
      let conf = confirm("댓글을 삭제하시겠습니까?");
      if (conf) {
        this.loaded = false;
        fbservice.deleteCommentComment(
          this.page,
          this.$route.params.did,
          this.comments[i].cid,
          this.comments[i].comments[j].cid
        );
        this.initialize();
      }
    },
    async updateComment(i) {
      if (this.mode === "update") {
        fbservice.updateComment(
          this.page,
          this.$route.params.did,
          this.comments[i].cid,
          this.editText
        );
      } else if (this.mode === "comment") {
        fbservice.postCommentComment(
          this.page,
          this.$route.params.did,
          this.comments[i].cid,
          store.state.userName,
          store.state.userEmail,
          this.editText
        );
      }
      this.loaded = false;
      this.originEditing[i] = false;
      await this.initialize();
    },
    async updateCommentComment(i, j) {
      if (this.mode === "update") {
        fbservice.updateCommentComment(
          this.page,
          this.$route.params.did,
          this.comments[i].cid,
          this.comments[i].comments[j].cid,
          this.editText
        );
      }
      this.loaded = false;
      this.editing[i].editing[j] = false;
      await this.initialize();
    },
    async loadAfterComment() {
      this.loaded = false;
      this.currentPage = this.currentPage + 1;
      let temp = await fbservice.getAfterCommentsPage(
        this.page,
        this.$route.params.did,
        new Date(this.comments[this.comments.length - 1].created_at)
      );

      this.comments = temp;
      await this.getCommentsComments();
      this.loaded = true;
      this.CanLoadNextComment();
    },
    async loadBeforeComment() {
      if (this.currentPage === 1) {
        return;
      }
      this.loaded = false;
      this.comments = await fbservice.getBeforeCommentsPage(
        this.page,
        this.$route.params.did,
        new Date(this.comments[0].created_at)
      );
      await this.getCommentsComments();
      this.loaded = true;
      this.currentPage = this.currentPage - 1;
      this.nextPage = true;
    },
    async CanLoadNextComment() {
      if (this.comments.length === 0) {
        this.nextPage = false;
        return;
      }
      let next = await fbservice.getAfterCommentsPage(
        this.page,
        this.$route.params.did,
        new Date(await this.comments[this.comments.length - 1].created_at)
      );
      if (next.length < 1) {
        this.nextPage = false;
      } else {
        this.nextPage = true;
      }
    },
    async getCommentsComments() {
      this.overFlowed = [];
      this.editing = [];
      for (let i = 0; i < this.comments.length; i++) {
        this.overFlowed.push(true);
        this.editing.push({ editing: [] });
        this.originEditing.push(false);
      }
      for (let i = 0; i < this.comments.length; i++) {
        let commentcomment = await fbservice.getCommentsComments(
          this.page,
          this.$route.params.did,
          this.comments[i].cid
        );
        if (commentcomment.length > 0) {
          let temp = [];
          for (let j = 0; j < commentcomment.length; j++) {
            temp.push(false);
          }
          this.editing[i].editing = temp;
          this.comments[i].comments = commentcomment;
        }
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
    toggleEditing(index, mode) {
      this.$set(this.originEditing, index, !this.originEditing[index]);
      this.mode = mode;
      this.editText = "";
    },
    toggleCommentEditing(i, j, mode) {
      this.$set(this.editing[i].editing, j, !this.editing[i].editing[j]);
      this.mode = mode;
      this.editText = "";
    },
    isWriter(i) {
      return (
        this.$store.state.userEmail === this.comments[i].email &&
        this.$store.state.userName === this.comments[i].name
      );
    },
    isCommentWriter(i, j) {
      return (
        this.$store.state.userName === this.comments[i].comments[j].name &&
        this.$store.state.userEmail === this.comments[i].comments[j].email
      );
    }
  },
  computed: {
    checkLoaded() {
      return this.loaded;
    },
    returnPage() {
      if (this.page === "portfolios") {
        return "/portfolio";
      } else {
        return "/post";
      }
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
