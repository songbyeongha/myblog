<template>
  <v-carousel
    :continuous="false"
    :cycle="cycle"
    :show-arrows="false"
    height="370"
    hide-delimiter-background
    delimiter-icon="mdi-minus"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
        tile
      >
        <!-- <v-layout
          align-center
          fill-height
          justify-center
        > -->
        <v-container>
          <v-layout>
            <v-img class="items">{{items[i].src}}</v-img>
            <float class="display-3">{{ slide }}</float></br>
            <div class="display-7"><br/>{{comments[i]}}</div>
            <!-- <v-img src="{{items[i].src}}"></v-img> -->
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
          'warning',
          'pink darken-2',
          'red lighten-1',
        ],
        slides: [
          '안녕하세요 송병하입니다',
          '안녕하세요 신민석입니다',
          '안녕하세요 윤은솔입니다'
        ],
        comments:[
          '모두에게 인정받는 개발자',
          '검증된 개발자',
          '성과를 확실히 내는 개발자'
        ],
        items:[
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ]
      }
    },
  }
</script>
