<template>
  <div>
    <v-navigation-drawer v-model="sidebar" app disable-resize-watcher>
      <v-list>
        <v-list-tile class="userNamePlace" v-if="userName" :to="memberLink">
          <v-list-tile-action>
            <v-icon>far fa-user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ userName }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!userCheck" @click="login">
          <v-list-tile-action>
            <v-icon>lock_open</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>login</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userCheck" @click="logout">
          <v-list-tile-action>
            <v-icon>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>logout</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="getRank == 'admin'" :to="adminLink">
          <v-list-tile-action>
            <v-icon>build</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Admin</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="grey lighten-4">
      <span class="hidden-md-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
          <v-icon>menu</v-icon>
        </v-toolbar-side-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h3 id="apptitle">{{ appTitle }}</h3>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="userNamePlace" v-if="userName" :to="memberLink">
          <i class="far fa-user userInfo"></i>
          {{ userName }}
        </v-btn>
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="getRank === 'admin'" :to="adminLink">
          <v-icon left dark>build</v-icon>Admin
        </v-btn>
        <v-btn v-if="!userCheck" fab dark small color="whitesmoke" @click="login">
          <v-icon>lock_open</v-icon>
        </v-btn>
        <v-btn v-if="userCheck" fab dark small color="whitesmoke" @click="logout">
          <v-icon>lock</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <LoginModal ref="LModal"></LoginModal>
    <Chat></Chat>
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";
import Chat from "./Chat.vue";
import FirebaseService from "@/services/FirebaseService";
import firebase from "firebase/app";
import store from "../store";

export default {
  name: "AppHeader",
  data() {
    return {
      appTitle: "MyBlog",
      sidebar: false,
      adminLink: "/MyConfig",
      memberLink: "/memberInfo",
      menuItems: [
        { title: "home", path: "/", icon: "home" },
        { title: "Portfolio", path: "/portfolio", icon: "assignment" },
        { title: "Post", path: "/post", icon: "speaker_notes" },
        { title: "Git Info", path: "/gitinfopage", icon: "share" }
      ],
      showlogin: true
    };
  },
  components: {
    LoginModal,
    Chat
  },
  computed: {
    getRank() {
      return this.$store.state.rank;
    },
    userName() {
      return this.$store.state.userName;
    },
    userCheck() {
      return this.$store.state.loginCheck;
    }
  },
  methods: {
    logout() {
      FirebaseService.logout();
      store.commit("loginInfo", {
        loginCheckVal: false,
        rankVal: "",
        userNameVal: "",
        userEmailVal: ""
      });
      alert("로그아웃되었습니다.");
    },
    login() {
      this.$store.state.ModalLogin = true;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Jua&display=swap");

#apptitle {
  font-family: "Jua", sans-serif;
}
.userInfo {
  margin-right: 16px;
}
.v-toolbar {
  transform: translateY(-64px) !important;
  top: inherit !important;
}
.userNamePlace {
  align-items: center;
  display: flex;
  font-weight: bold;
  color: #1698bb;
}
.userNamePlace > .fa-user {
  margin-right: 10px;
}
@media (max-width: 960px) {
  .v-toolbar {
    transform: translateY(-48px) !important;
  }
}
@media (max-width: 910px) {
  .v-toolbar {
    transform: translateY(-56px) !important;
  }
}
</style>
