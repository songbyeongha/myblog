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
import MemberInfo from "./views/MemberInfo";
import Calendar from "./views/CalendarPage";
import store from "./store";
import NotFound from "./views/NotFound";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  if (store.state.rank == "admin") {
    return next();
  } else {
    alert("관리자 권한이 필요합니다.");
    next("/");
  }
};

const requireLoginPort = () => (to, from, next) => {
  if (store.state.rank == "admin" || store.state.rank == "team") {
    return next();
  } else {
    alert("포트폴리오는 팀원이나 관리자만 작성이 가능합니다.");
    next("/portfolio");
  }
};

const requireLoginPost = () => (to, from, next) => {
  if (store.state.rank == "admin" || store.state.rank == "team") {
    return next();
  } else {
    alert("포스트는 팀원이나 관리자만 작성이 가능합니다.");
    next("/post");
  }
};

const requireLoginCalendar = () => (to, from, next) => {
  if (store.state.rank) {
    return next();
  } else {
    alert("로그인이 필요한 기능입니다.");
    next("/");
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
      path: "/portfolio-add/:mode",
      name: "addportfolio",
      component: AddPortfolioPage,
      beforeEnter: requireLoginPort()
    },
    {
      path: "/post-add/:mode",
      name: "addpost",
      component: AddPostPage,
      beforeEnter: requireLoginPost()
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
    },
    {
      path: "/memberInfo",
      name: "memberInfo",
      component: MemberInfo
    },
    {
      path: "/Calendar",
      name: "calendar",
      component: Calendar,
      beforeEnter: requireLoginCalendar()
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});
