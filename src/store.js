import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    user: "",
    imgUrl: "",
    bannerImgUrl: "https://source.unsplash.com/collection/827743/1600x900",
    ModalLogin: false,
    ModalRegis: false,
    ModalGit: false,
    ModalIndex: -1,
    GitFindMember: [],
    GitMember: ["신민석", "송병하", "이대경", "Yoon,EunSol"],
    ModalGitMember: [],
    rank: "",
    portfoilio: null,
    deviceToken: "",
    userName: "",
    userEmail: ""
  }
});
