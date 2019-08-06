<template>
  <v-container grid-list-md text-center fill-height class="pa-4">
    <v-layout align-center justify-center wrap fill-height>
      <template v-for="(item, i) in items">
        <v-flex
          :key="i"
          xs12
          sm4
        >
          <v-hover v-slot:default="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img
                :src="item.img"
                height="250px"
              >
                <v-card-title class="title white--text fill-height">
                  <v-layout
                    fill-height
                    column
                    justify-space-between
                  >
                    <p class="mt-4 subheading text-left">{{ item.title }}</p>

                    <div>
                      <p class="ma-0 body-1 font-weight-bold font-italic text-left">
                        {{ item.text }}
                      </p>
                      <p class="caption font-weight-medium font-italic text-left">
                        {{ item.subtext }}
                      </p>
                    </div>

                    <div class="align-self-center">
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        color="transparent"
                        icon
                      >
                        <v-icon
                          :class="{ 'show-btns': hover }"
                          color="transparent"
                        >
                          {{ icon }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-layout>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-flex>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name:"About Members",
    data: () => ({
      icons: ['fast_rewind', 'play_arrow', 'fast_forward'],
      items: [
        {
          title: '송병하',
          text: '프론트엔드 개발자를 꿈꾸는 학생입니다.',
          subtext: '지금은 vue.js를 배우고 있어요.',
          img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg',
        },
        {
          title: '신민석',
          text: '아직 미숙하지만 언젠가는 잘 할수 있을거라 믿습니다.',
          subtext: '정말 신기하고 재미있네요!',
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        },
        {
          title: '윤은솔',
          text: '안녕하세요 뷰js를 배우고 있는 학생입니다.',
          subtext: '저는 멋진 개발자로 성장할거에요!!',
          img: 'http://lorempixel.com/output/abstract-q-c-640-480-6.jpg',
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }),
  }
</script>
<style scoped>
.v-card {
  transition: opacity .4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
 }

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
