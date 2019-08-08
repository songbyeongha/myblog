import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    user: "",
    imgUrl: "",
    defaultImg: "",
    bannerImgUrl: "https://source.unsplash.com/collection/827743/1600x900",
    ModalLogin: false,
    ModalRegis: false,
    ModalGit: false,
    ModalIndex: -1,
    GitFindMember: [],
    GitMember: ["신민석", "송병하", "Yoon,EunSol"],
    ModalGitMember: [],
    rank: "",
    loginCheck: false,
    portfoilio: null,
    deviceToken: "",
    userName: "",
    userEmail: ""
  },
  plugins: [createPersistedState()],
  mutations: {
    loginInfo: function(state, payload) {
      state.loginCheck = payload.loginCheckVal;
      state.rank = payload.rankVal;
      state.userName = payload.userNameVal;
      state.userEmail = payload.userEmailVal;
    }
  }
});
