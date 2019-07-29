<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">Admin Configuration</div>
    </ImgBanner>
    <v-container>
      <v-flex xs12 mg12 lg12 text-xs-center>
        <h2>사용자 권한 설정</h2>
      </v-flex>
      <UserTable></UserTable>
      <v-layout row wrap style="margin-top: 20px;">
        <v-flex xs6 mg6 lg6 text-xs-center>
          <h2>총 게시글 수</h2>
        </v-flex>
        <v-flex xs6 mg6 lg6 text-xs-center>
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
          <h2 v-else>{{ sum }}</h2>
        </v-flex>
        <v-flex xs6 mg6 lg6 text-xs-center>
          <h2>POSTS</h2>
        </v-flex>
        <v-flex xs6 mg6 lg6 text-xs-center>
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
          <h2 v-else>{{ posts }}</h2>
        </v-flex>
        <v-flex xs6 mg6 lg6 text-xs-center>
          <h2>PORTFOLIOS</h2>
        </v-flex>
        <v-flex xs6 mg6 lg6 text-xs-center>
          <v-progress-circular
            indeterminate
            color="primary"
            v-if="loading"
          ></v-progress-circular>
          <h2 v-else>{{ portfolios }}</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import UserTable from "../components/UserTable";
import fbservice from "@/services/FirebaseService.js";
import { clearInterval } from "timers";

export default {
  name: "ConfigPage",
  components: {
    ImgBanner,
    UserTable
  },
  data() {
    return {
      posts: 0,
      portfolios: 0,
      loading: true
    };
  },
  computed: {
    sum() {
      return this.posts + this.portfolios;
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.posts = await fbservice.countPost();
      this.portfolios = await fbservice.countPortfolio();
      this.loading = false;
    }
  }
};
</script>

<style></style>
