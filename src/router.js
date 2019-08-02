import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import LoginPage from "./views/LoginPage.vue";
import AddPortfolioPage from "./views/AddPortfolioPage.vue";
import AddPostPage from "./views/AddPostPage.vue";
import GitInfoPage from "./views/GitInfoPage.vue";
import MyConfig from "./views/MyConfig";
import ViewPortfolio from "./views/PortfolioViewPage";
import ViewPost from "./views/PostViewPage";
import store from "./store";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  if (store.state.rank == "admin") {
    return next();
  } else {
    alert("관리자 권한이 필요합니다.");
    next("/");
  }
};

const requireLogin = () => (to, from, next) => {
  if (store.state.rank == "admin" || store.state.rank == "team") {
    return next();
  } else {
    alert("포트폴리오는 팀원이나 관리자만 작성이 가능합니다.");
    next("/portfolio");
  }
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/post",
      name: "post",
      component: PostPage
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/portfolio-add",
      name: "addportfolio",
      component: AddPortfolioPage,
      beforeEnter: requireLogin()
    },
    {
      path: "/post-add",
      name: "addpost",
      component: AddPostPage,
      beforeEnter: requireLogin()
    },
    {
      path: "/gitinfopage",
      name: "gitinfopage",
      component: GitInfoPage
    },
    {
      path: "/myconfig",
      name: "myconfig",
      component: MyConfig,
      beforeEnter: requireAuth()
    },
    {
      path: "/viewPortfolio/:did",
      name: "viewPortfolio",
      component: ViewPortfolio
    },
    {
      path: "/viewPost/:did",
      name: "viewPost",
      component: ViewPost
    }
  ]
});
