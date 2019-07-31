<template>
  <v-layout align-center justify-center row wrap>
    <v-flex xs4 text-xs-center>
      <label>아이디</label>
    </v-flex>
    <v-flex xs8>
      <input
        class="inputBox"
        type="text"
        v-model="email"
        placeholder="E-mail"
      />
      <br />
    </v-flex>
    <v-flex xs4 text-xs-center>
      <label>비밀번호</label>
    </v-flex>
    <v-flex xs8>
      <input
        class="inputBox"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </v-flex>
    <v-flex xs12>
      <v-btn color="#42b983" v-on:click="loginservice" class="loginBtn"
        >로그인</v-btn
      >
    </v-flex>
    <v-flex xs12>
      <v-btn
        round
        color="#df4a31"
        dark
        v-on:click="loginWithGoogle"
        style="width:100%;"
      >
        <v-icon size="20" class="mr-2">fab fa-google</v-icon>Google 로그인
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn
        round
        color="#3b5998"
        dark
        v-on:click="loginWithFacebook"
        style="width:100%;"
      >
        <v-icon size="20" class="mr-2">fab fa-facebook</v-icon>FaceBook 로그인
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-btn color="#42b983" @click="funcregis" class="loginBtn"
        >회원가입</v-btn
      >
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import store from "../store";
import firebase from "firebase/app";

export default {
  name: "LoginPage",
  data() {
    return {
      accessToken: "",
      username: "",
      regis: false,
      booleanlogin: false,
      email: "",
      password: ""
    };
  },
  computed: {},
  methods: {
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      const res = await FirebaseService.getPermission(result.user.uid);

      if (!res) {
        await FirebaseService.postPermission(
          result.user.uid,
          "visitor",
          result.user.email,
          result.user.displayName,
          ""
        );
      } else {
        await FirebaseService.updateDeviceToken(result.user.uid);
      }

      this.$store.accessToken = result.credential.accessToken;
      this.$store.user = result.user;
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      const res = await FirebaseService.getPermission(result.user.uid);

      if (!res) {
        await FirebaseService.postPermission(
          result.user.uid,
          "visitor",
          result.user.email,
          result.user.displayName,
          ""
        );
      } else {
        await FirebaseService.updateDeviceToken(result.user.uid);
      }
      this.$store.accessToken = result.credential.accessToken;
      this.$store.user = result.user;
    },
    async loginservice() {
      const result = await FirebaseService.loginEmail(
        this.email,
        this.password
      );
      const res = await FirebaseService.getPermission(result.user.uid);
      if (!res) {
        await FirebaseService.postPermission(
          result.user.uid,
          "visitor",
          result.user.email,
          result.user.displayName,
          ""
        );
      } else {
        await FirebaseService.updateDeviceToken(result.user.uid);
      }
    },
    funcregis() {
      this.regis = !this.regis;
      this.$emit("regismodal", this.regis);
    },
    getUser() {
      if (FirebaseService.getState() == null) return;
      if (FirebaseService.getState().displayName != "") {
        this.showlogin = false;
      }
    }
  }
};
</script>

<style>
.theme--light .modal-mask .loginBtn {
  background-color: rgb(223, 74, 49);
  border-color: rgb(223, 74, 49);
  width: 100%;
  border-radius: 25px;
  color: #fff;
  font-weight: bold;
}
</style>
