<template>
  <v-carousel
    :continuous="false"
    :cycle="cycle"
    :show-arrows="false"
    weight=100%;
    max-height="400"
    hide-delimiter-background
    delimiter-icon="mdi-minus"
  >
    <v-carousel-item
      v-for="(name, i) in names"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
        tile
      >
        <v-container grid-list-md text-center>
          <v-layout wrap>
            <v-flex d-flex xs6>
              <v-card>
                <img :src="items[i].src" class="aboutImage">
                <v-card-text class="px-0"></v-card-text>
              </v-card>
            </v-flex>
              <v-flex de-flex xs6>
                <v-flex xs12>
                  <v-card color="font-weight-bold font-italic text-left">
                    <v-card-text class="px-5 cardText headline font-weight-bold font-italic text-left">{{name}}</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-card>
                    <v-card-text class="px-5">{{comments[i]}}</v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12>
                  <v-card>
                    <v-card-text class="px-5">{{emailAddress[i]}}</v-card-text>
                  </v-card>
                </v-flex>
              </v-flex>
            </v-layout wrap>
          </v-layout>
        </v-container>
        <!-- </v-layout> -->
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        cycle: false,
        colors: [
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
        names: [
          '6조 My Blog팀',
          '송병하',
          '신민석',
          '윤은솔'
        ],
        comments:[
          '안녕하세요 6조입니다. 점점 팀원들이 사라지네요,,, 남은 팀원끼리 으쌰으쌰 하겠습니다',
          '모두에게 인정 받는 개발자가 되고 싶습니다.배움에 있어 최선을 다하고, 활용에 있어 번뜩임을 보여주겠습니다.',
          '안녕하세요, 여러분! 프론트엔드 개발자를 꿈꾸는 학생입니다. 지금은 vue.js를 배우고 있어요. 아직 미숙하지만 언젠가는 잘 할수 있을거라 믿습니다. 정말 신기하고 재미있네요!',
          '성과를 확실히 내는 개발자'
        ],
        items:[
          {
            src: 'https://motto.za.net/wp-content/uploads/2018/12/5-Positive-Conflict-tips-You-Can-Learn-From-High-Performance-Teams-1024x576.jpg',
          },
          {
            // <v-img :src="getImgUrl('myprofile.jpg')" aspect-ratio="1.5"/>
            src: require('../assets/song.jpg'),
          },
          {
            src: require('../assets/shin.jpg'),
          },
          {
            src: require('../assets/yoon.jpg'),
          },
        ],
        emailAddress:[
          'GitLab : https://lab.ssafy.com/todal/webmobile-final',
          'Email address : qudgk0006@naver.com',
          'Email address : alstjr7388@naver.com',
          'Email address : todal160122@gmail.com'
        ]
      }
    }
  }
</script>
<style>
.aboutImage{
  width: 100%;
  height: inherit;
}
.theme--dark.v-sheet {
    background-color: #0000;
    border-color: #0000;
    color: #fff;
}

</style>
