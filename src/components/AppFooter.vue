<template>
  <v-footer height="auto">
    <v-card flat tile class="flex">
      <v-card-text class="indigo lighten-4">
        <v-layout row wrap>
          <v-flex xs12 md6 lg6>
            <span class="body-2">Weather</span>
            <weather></weather>
          </v-flex>
          <v-flex v-for="(col, i) in rows" :key="i" xs12 md6 lg6>
            <span class="body-2" v-text="col.title.toUpperCase()"></span>
            <div v-for="(child, i) in col.children" :key="i" v-text="child"></div>
            <div>
              GitLab :
              <a :href="gitLink">{{ gitLink }}</a>
            </div>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="blue-grey darken-3 justify-center" style="color:white">
        &copy;2019 —
        <strong>Shin MinSeok</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
import weather from "./Weather.vue";

export default {
  name: "AppFooter",
  data() {
    return {
      rows: [
        {
          title: "Web-mobile Project",
          children: ["Start : 2019-07-01"]
        }
      ],
      gitLink: "https://lab.ssafy.com/todal/webmobile-sub2"
    };
  },
  components: {
    weather
  }
};
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .layout.column,
  .body-2 {
    font-size: 4vw;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .v-cion {
    size: 4vw;
  }
}
</style>
