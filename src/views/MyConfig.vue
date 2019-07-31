<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">Admin Configuration</div>
    </ImgBanner>
  <v-app id="inspire">
    <v-card>
      <v-tabs vertical>
        <v-tab>
          <v-icon left>mdi-account</v-icon>
          계정권한설정
        </v-tab>
        <v-tab>
          <v-icon left>mdi-lock</v-icon>
          카운터
        </v-tab>
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
         AnalysticJson
        </v-tab>

        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
          SessionChart
        </v-tab>
  
        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
          VisitCounter
        </v-tab>

        <v-tab>
          <v-icon left>mdi-access-point</v-icon>
          Country
        </v-tab>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- Table -->
              <UserTable></UserTable>
              
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- Counter -->
              <PostCounter></PostCounter>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- Graph -->
              <GA></GA>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- Graph -->
              <GaChart></GaChart>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- Graph -->
              <GaVisCounter></GaVisCounter>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <!-- Graph -->
              <GaCountry></GaCountry>
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
import PostCounter from '../components/PostCounter.vue';
import GA from '../components/GoogleAnalystic.vue';
import GaChart from '../components/GoogleAnalysticChart.vue';
import { clearInterval } from "timers";
import GaVisCounter from '../components/GoogleAnalysticVisitCounter.vue';
import GaCountry from '../components/GoogleAnalysticCountry.vue';

export default {
  name: "ConfigPage",
  components: {
    ImgBanner,
    UserTable,
    PostCounter,
    GA,
    GaChart,
    GaVisCounter,
    GaCountry,
  },
 
};
</script>

<style></style>
