<template>
  <div>
    <Modal v-if="this.$store.state.ModalLogin == true" @close="closeModal">
      <h3 slot="header">
        로그인
        <i class="closeBtn fas fa-times" @click="closeModal"></i>
      </h3>
      <div slot="body">
        <LoginService @regismodal="modal"></LoginService>
      </div>
    </Modal>

    <Modal v-if="this.$store.state.ModalRegis" @close="closeRegis">
      <h3 slot="header">
        회원가입
        <i class="closeBtn fas fa-times" @click="closeRegis"></i>
      </h3>
      <div slot="body" class="modalSize">
        <form v-on:submit="regisservice">
          <v-layout align-center justify-center row wrap>
            <v-flex xs4 text-xs-center>
              <label>아이디</label>
            </v-flex>
            <v-flex xs8>
              <input class="inputBox" type="text" v-model="email" placeholder="Email" />
              <br />
            </v-flex>
            <v-flex xs4 text-xs-center>
              <label>이름</label>
            </v-flex>
            <v-flex xs8>
              <input class="inputBox" type="text" v-model="name" placeholder="Name" />
              <br />
            </v-flex>
            <v-flex xs4 text-xs-center>
              <label>비밀번호</label>
            </v-flex>
            <v-flex xs8>
              <input class="inputBox" type="password" v-model="password" placeholder="Password" />
            </v-flex>
            <v-flex xs4 text-xs-center>
              <label>비번확인</label>
            </v-flex>
            <v-flex xs8>
              <input
                class="inputBox"
                type="password"
                v-model="passwordchk"
                @keyup="chkpassword"
                placeholder="Password Conform"
              />
            </v-flex>
            <v-flex>
              <input type="submit" class="submitbtn" value="가입하기" />
              <br />
            </v-flex>
            <v-flex>
              <lable class="modaltext">{{ samechk }}</lable>
            </v-flex>
          </v-layout>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import LoginService from "../views/LoginPage.vue";
import FirebaseService from "@/services/FirebaseService";
import store from "../store.js";

export default {
  name: "loginModal",
  components: {
    LoginService,
    Modal
  },
  data() {
    return {
      email: "",
      password: "",
      regisModal: false,
      passwordchk: "",
      samechk: "",
      name: "",
      color: false
    };
  },
  methods: {
    closeRegis() {
      store.state.ModalRegis = false;
    },
    closeModal() {
      this.$store.state.ModalLogin = false;
    },
    async regisservice(e) {
      e.preventDefault();
      if (this.password === this.passwordchk) {
        FirebaseService.signUpEmail(this.email, this.password, this.name);
        this.samechk = "가입이 완료되었습니다.";
        this.$store.state.ModalRegis = false;
      } else {
        this.samechk = "비밀번호가 일치하지 않습니다.";
      }
    },
    modal(b) {
      this.$store.state.ModalLogin = !this.$store.state.ModalLogin;
      this.$store.state.ModalRegis = !this.$store.state.ModalRegis;
    },
    chkpassword() {
      if (this.password === this.passwordchk) {
        this.samechk = "비밀번호가 일치합니다.";
      } else {
        this.samechk = "비밀번호가 일치하지 않습니다.";
      }
    }
  }
};
</script>

<style>
a {
  color: white;
  text-decoration: none;
}
.inputBox {
  background: whitesmoke;
  height: 40px;
  line-height: 50px;
  border-radius: 5px;
  margin-bottom: 5px;
  text-indent: 10px;
}

.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.submitbtn {
  color: white;
  background: #42b983;
  width: 13rem;
  margin-left: 2.5rem;
  text-align: center;
  height: 35px;
  line-height: 35px;
  border-radius: 25px;
  margin-bottom: 5px;
  margin-top: 30px;
}

.modaltext {
  margin-left: 2rem;
  margin-top: 2rem;
}

.modalSize {
  height: 260px;
}

.closeBtn {
  float: right;
}

.theme--light .modal-mask .loginBtn {
  background-color: rgb(223, 74, 49);
  border-color: rgb(223, 74, 49);
  width: 100%;
  border-radius: 25px;
  color: #fff;
  font-weight: bold;
}
</style>
