<template>
    <div>
        <v-navigation-drawer v-model="sidebar" app disable-resize-watcher>
          <v-list>
            <v-list-tile class="userNamePlace" v-if="userName">
              <v-list-tile-action>
                <v-icon>far fa-user</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{userName}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if='showlogin' @click="login">
              <v-list-tile-action>
                <v-icon>lock_open</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>login</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if='!showlogin' @click="logout">
              <v-list-tile-action>
                <v-icon>lock</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>logout</v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for='item in menuItems' :key="item.title" :to="item.path">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>{{ item.title }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="grey lighten-4">
          <span class="hidden-sm-and-up">
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
          <v-toolbar-items class="hidden-xs-only">
            <v-card-text class="userNamePlace" v-if="userName">
              <i class="far fa-user"></i> 
              {{userName}}
            </v-card-text>
            <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
              <v-icon left dark>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
            <v-btn v-if='showlogin'
              fab
              dark
              small
              color="whitesmoke"
              @click="login"
            >
              <v-icon>lock_open</v-icon>
            </v-btn>
            <v-btn v-if='!showlogin'
              fab
              dark
              small
              color="whitesmoke"
              @click="logout"
            >
              <v-icon>lock</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <LoginModal ref="LModal"></LoginModal>
    </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";
import FirebaseService from "@/services/FirebaseService";
import firebase from "firebase/app";

export default {
	name: "AppHeader",
	data(){
		return {
			appTitle: "MyBlog",
      sidebar: false,
      userName : '',
			menuItems: [
				{title:"home",              path: "/",               icon:"home"},
				{title:"Portfolio",         path:"/portfolio",        icon:"assignment"},
				{title:"Post",              path:"/post",             icon:"speaker_notes"},
				{title:"Git Info",          path:"/gitinfopage",      icon:"calendar_today"},
			],
			showlogin:true
		};
	}, 
	components:{
		LoginModal
  },
	created:function(){
		let instance_this = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if(user){
        // 로그인됨
        instance_this.userCheck();
        let displayName = (user.displayName==null)?"아무개":user.displayName;
        instance_this.modifyName(displayName);
			}
		});
  },
	methods:{
		userCheck:function(){
			this.showlogin = false;
		},
		logout(){
      this.showlogin=true;
      this.userName = "";
			FirebaseService.logout();
		},
		login(){
			this.$store.state.ModalLogin = true;
    },
    modifyName(name){
      this.userName = name;
    }
	}
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Jua&display=swap');

#apptitle{
  font-family: 'Jua', sans-serif;
}
.v-toolbar{
  transform: translateY(-64px) !important;
  top: inherit !important;
}
.userNamePlace{
  align-items: center;
  display: flex;
  font-weight: bold;
  color: #1698bb;
}
.userNamePlace>.fa-user{
    margin-right: 10px;
}
@media (max-width: 960px) { 
  .v-toolbar{
    transform: translateY(-48px) !important;
  }
}
@media (max-width: 572px) { 
  .v-toolbar{
    transform: translateY(-56px) !important;
  }
}
</style>
