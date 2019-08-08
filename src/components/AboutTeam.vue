<template>
  <v-carousel
    :continuous="false"
    :cycle="cycle"
    :show-arrows="false"
    hide-controls
    weight="100%;"
    max-height="400"
    hide-delimiter-background="false"
    mandatory
    light
  >
    <v-carousel-item v-for="(name, i) in names" :key="i">
      <v-sheet height="100%" tile>
        <v-container grid-list-md text-center class="aboutContainer">
          <v-layout wrap>
            <v-flex md6 hidden-sm-and-down>
              <v-img
                :src="items[i].src"
                class="aboutImage"
                aspect-ratio="1.7"
              />
            </v-flex>
            <v-flex xs12 md6>
              <v-flex xs12>
                <v-card color="text-left aboutName">
                  <v-card-text class>{{ name }}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-text class="aboutComments">{{
                    comments[i]
                  }}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-text class="aboutSkill">{{ skills[i] }}</v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12>
                <v-card>
                  <v-card-text class="aboutEmail">{{
                    emailAddress[i]
                  }}</v-card-text>
                </v-card>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- </v-layout> -->
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "AboutTeam",
  data() {
    return {
      cycle: false,
      names: ["6조 My Blog팀", "송병하", "신민석", "윤은솔"],
      comments: [
        "안녕하세요 6조입니다. 점점 팀원들이 사라지네요,,, 남은 팀원끼리 으쌰으쌰 하겠습니다",
        "모두에게 인정 받는 개발자가 되고 싶습니다. 배움에 있어 최선을 다하고, 활용에 있어 번뜩임을 보여주겠습니다.",
        "안녕하세요, 여러분! 프론트엔드 개발자를 꿈꾸는 민석입니다. 지금은 vue.js를 배우고 있어요. 아직 미숙하지만 언젠가는 잘 할수 있을거라 믿습니다. 정말 신기하고 재미있네요!",
        "성과를 확실히 내는 개발자가 되겠습니다. 열심히 배우고 익혀 실전에서 활약할거에요. 화이팅입니다."
      ],
      items: [
        {
          src:
            "https://motto.za.net/wp-content/uploads/2018/12/5-Positive-Conflict-tips-You-Can-Learn-From-High-Performance-Teams-1024x576.jpg"
        },
        {
          // <v-img :src="getImgUrl('myprofile.jpg')" aspect-ratio="1.5"/>
          src: require("../assets/song.jpg")
        },
        {
          src: require("../assets/shin.jpg")
        },
        {
          src: require("../assets/yoon.jpg")
        }
      ],
      emailAddress: [
        "GitLab : https://lab.ssafy.com/todal/webmobile-final",
        "Email address : qudgk0006@naver.com",
        "Email address : alstjr7388@naver.com",
        "Email address : todal160122@gmail.com"
      ],
      skills: [
        "사용기술 : HTML, CSS, Javascript, ES6, Vue.js, firebase, danbee.ai, Api, Disqus",
        "사용가능기술 : C, Java, PHP, Javascript, jQuery, HTML, CSS, Vue.js, Python, Spring",
        "사용가능기술 : C, Java, C++, Javascript, HTML, CSS, Vue.js, Python, Spring",
        "사용가능기술 : C, Java, Javascript, HTML, CSS, Vue.js, Node.js, Python, Spring"
      ]
    };
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Do+Hyeon&display=swap");
@media screen and (max-width: 600px) {
  .aboutName .v-card__text {
    font-size: 10vw;
  }
  .aboutComments.v-card__text {
    font-size: 3vw;
  }
  .v-sheet .aboutContainer {
    padding-left: 0px;
    padding-right: 0px;
  }
  .flex .v-carousel {
    height: 300px;
  }
}

.aboutImage {
  width: 100%;
  height: -webkit-fill-available;
}
.theme--dark.v-sheet {
  background-color: #0000;
  border-color: #0000;
  color: #fff;
}
.aboutContainer {
  padding-bottom: 40px;
  padding-left: 40px;
  padding-right: 40px;
  font-family: "Do Hyeon", sans-serif;
}
.aboutName {
  font-weight: bold;
  font-size: 3vw;
}
.aboutComments {
  font-size: 2vw;
}
.aboutSkill {
  font-size: medium;
}
.aboutEmail {
  font-size: medium;
}
.v-card__text {
  padding: 5px;
  width: 100%;
}
.v-card {
  box-shadow: none;
}
.v-carousel__controls {
  background: none;
  height: 30px;
  bottom: 7px;
}
.v-card__text.px-0 {
  padding: unset;
}
</style>
