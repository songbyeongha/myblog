<template>
  <v-app>
    <v-container>
      <v-layout class="portfolio" justify-center row wrap>
        <v-flex xs11>
          <h1 class="contentHeadTitle">PORTFOLIO</h1>
        </v-flex>
        <v-flex xs11>
          <v-card>
            <v-card-title>
              <v-layout row wrap class="portfolioTitle">
                <v-flex xs12 sm12 md8 class="pTitle">{{
                  getPortfolio.title
                }}</v-flex>
                <v-flex xs12 sm12 md4 class="pWriter">
                  <span class="subText subDate"
                    >{{ getDate }} &nbsp;&nbsp;&nbsp;
                    {{ getPortfolio.name }}</span
                  >
                </v-flex>
              </v-layout>
              <v-img
                class="white--text bannerImg"
                aspect-ratio="1.7"
                :src="getPortfolio.img"
              ></v-img>
              <br />
              <div v-html="compiledMarkdown" class="subTextarea"></div>
            </v-card-title>
            <v-card v-if="userCheck" class="buttonPlace">
              <v-btn color="primary" :to="addlink">수정</v-btn>
              <v-btn color="primary" @click="deletePortfolio()">삭제</v-btn>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      <comment page="portfolios"></comment>
    </v-container>
  </v-app>
</template>

<script>
import store from "../store";
import fbservice from "../services/FirebaseService";
import comment from "../components/Comments";

export default {
  name: "viewPortfolio",
  components: {
    comment
  },
  data() {
    return {
      portfolio: {
        img: "",
        body: "",
        email: "",
        name: "",
        title: "",
        created_at: "",
        modify_at: ""
      },
      userCheck: false,
      addlink: "/portfolio-add/" + this.$route.params.did
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let id = this.$route.params.did;
      this.portfolio = await fbservice.getOnePortfolio(id);
      if (
        this.portfolio.email == store.state.userEmail ||
        store.state.rank == "admin"
      ) {
        this.userCheck = true;
      }
    },
    async deletePortfolio() {
      let conf = confirm("정말로 삭제하시겠습니까?");
      if (conf) {
        let path = "portfolios/" + this.$route.params.did;
        await fbservice.deleteAtPath(
          "portfolio",
          this.$route.params.did,
          "portfolios/" + this.$route.params.did
        );
        alert("포트폴리오를 삭제했습니다.");
        this.$router.replace("/portfolio");
      }
    }
  },
  computed: {
    getPortfolio() {
      return this.portfolio;
    },
    compiledMarkdown() {
      return marked(this.portfolio.body);
    },
    getDate() {
      return this.$moment(this.portfolio.modify_at).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style scoped>
.bannerImg {
  width: 97%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.contentHeadTitle {
  text-align: center;
  margin-bottom: 30px;
}
.portfolio {
  margin-top: 5%;
}
.portfolioTitle {
  background: #577b8d;
  color: #f5f5f5;
  text-align: left;
  padding: 2px 14px;
  border-radius: 6px;
  margin-bottom: 10px;
}
.portfolioTitle .pWriter {
  line-height: 45px;
}
.portfolioTitle .pTitle {
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
  width: 100%;
}
.subTextarea >>> img {
  width: 100%;
}
.buttonPlace {
  text-align: center;
  padding: 15px 0px;
}
.buttonPlace button {
  color: #f5f5f5;
}
</style>
