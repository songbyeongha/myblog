<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">
        Member Information
        <br />
      </div>
    </ImgBanner>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="mtitle">Member Information</h1>
        </v-flex>
        <v-flex xs12>
          <v-expansion-panel v-model="panel" expand>
            <v-expansion-panel-content v-for="(item,i) in items" :key="i">
              <template v-slot:header>
                <div>{{item.title}}</div>
              </template>
              <v-card v-if="item.modifyCk">
                <v-text-field label="name" flat solo v-model="modifyName"></v-text-field>
              </v-card>
              <v-card v-if="!item.modifyCk">
                <v-card-text>{{item.value}}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
        <v-flex xs12>
          <div class="text-xs-center buttonPlace">
            <v-btn v-if="true" round color="primary" dark @click="modify()">회원수정</v-btn>
            <v-btn v-if="true" round color="primary" dark @click="withdrawal()">회원탈퇴</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebaseService from "../services/FirebaseService";
import ImgBanner from "../components/ImgBanner";

export default {
  name: "memberInfo",
  data() {
    return {
      items: [
        {
          title: "Email",
          modifyCk: false,
          value: this.$store.state.userEmail
        },
        {
          title: "회원등급",
          modifyCk: false,
          value: this.$store.state.rank
        },
        {
          title: "이름",
          modifyCk: true,
          value: this.$store.state.userName
        }
      ],
      panel: [true, true, true],
      modifyName: this.$store.state.userName
    };
  },
  components: {
    ImgBanner
  },
  methods: {
    async modify() {
      let conf = confirm("수정하시겠습니까?");
      if (conf) {
        await firebaseService.modifyMember(this.modifyName);
        alert("수정했습니다.");
        this.$router.replace("/memberInfo");
      }
    },
    async withdrawal() {
      let conf = confirm("회원탈퇴하시겠습니까?");
      if (conf) {
        await firebaseService.deleteMember();
        alert("회원탈퇴되었습니다.");
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style scoped>
.mtitle {
  text-align: center;
  margin-bottom: 40px;
  margin-top: 20px;
}
.buttonPlace {
  margin-top: 20px;
  margin-bottom: 30px;
}
.toggle.v-input--is-disabled.v-text-field--outline .v-input__slot {
  border-color: #fff;
}
</style>
