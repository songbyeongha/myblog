<template>
  <v-app>
    <v-content>
      <AppHeader></AppHeader>
      <SlideBtn></SlideBtn>
      <ChromeCheck></ChromeCheck>
      <router-view />
      <AppFooter></AppFooter>
      <Translate></Translate>
    </v-content>
  </v-app>
</template>
<!-- test -->
<script>
window.onload = function() {};

import store from "./store";
import AppHeader from "../src/components/AppHeader.vue";
import AppFooter from "../src/components/AppFooter.vue";
import GoTop from "../src/components/goTop.vue";
import Bookmark from "../src/components/Bookmark.vue";
import ChromeCheck from "../src/components/ChromeCheck.vue";
import SlideBtn from "../src/components/SlideBtn.vue";
import Translate from "../src/components/Translate.vue";
import firebase from "firebase/app";
import fbservice from "./services/FirebaseService";

export default {
  name: "App",
  store,
  components: {
    AppHeader,
    AppFooter,
    ChromeCheck,
    SlideBtn,
    Translate
  },
  data() {
    return {
      //   logout: false
    };
  },
  methods: {
    // gglogin() {
    //   this.logout = true;
    // }
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        // 로그인됨
        user.displayName == null ? "아무개" : user.displayName;
        store.state.rank = await fbservice.getPermission(user.uid);
        store.state.userName = user.displayName;
        store.state.userEmail = user.email;
      }
    });
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Jua&display=swap");
.bannerText {
  font-family: "Jua", sans-serif;
  font-size: 8vw;
  line-height: 1.2em;
  color: blanchedalmond;
  text-shadow: 2px 0 gray, 0 2px gray, 2px 0 gray, 0 2px gray;
}
</style>
