<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">Admin Configuration</div>
    </ImgBanner>
  <v-app id="inspire">
    <v-card>
      <v-tabs vertical>
        <v-tab>
          사용자목록
        </v-tab>

        <v-tab>
          전체게시글
        </v-tab>

        <v-tab>  
          G.A.
        </v-tab>

        <v-tab>
          Seesion
        </v-tab>

        <v-tab>
          Country
        </v-tab>
  
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- Table -->
              <v-flex xs12 mg12 lg12 text-xs-center>
                <h2>사용자 권한 설정</h2>
              </v-flex>
              <UserTable></UserTable>      
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- 게시글수 -->
              <PostCounter></PostCounter>
            </v-card-text>
          </v-card>
        </v-tab-item>


        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- GA api call -->
              <GoogleAnalytics></GoogleAnalytics>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- 세션차트 -->
                <GaSessionChart></GaSessionChart>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- 나라차트 -->
                <GaCountryChart></GaCountryChart>
            </v-card-text>
          </v-card>
        </v-tab-item>

      </v-tabs>
    </v-card>
  </v-app>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import UserTable from "../components/UserTable";
import fbservice from "@/services/FirebaseService.js";
import PostCounter from "../components/PostCounter.vue";
import GoogleAnalytics from "../components/GoogleAnalytics.vue";
import GaSessionChart from "../components/GoogleAnalysticsSession.vue";
import GaCountryChart from "../components/GoogleAnalyticsCountry.vue";
import { clearInterval } from "timers";

export default {
  name: "ConfigPage",
  components: {
    ImgBanner,
    UserTable,
    PostCounter,
    GoogleAnalytics,
    GaSessionChart,
    GaCountryChart
  },
  
};
</script>

<style></style>
