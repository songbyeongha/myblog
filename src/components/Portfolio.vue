<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-img :src="imgSrc" height="200px"></v-img>
      <v-card-title primary-title class="portfolioTextPlace">
        <div class="headline">{{ title }}</div>
        <span class="grey--text subText">{{ body }}</span>
      </v-card-title>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgSrc: { type: String }
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style>
.headline {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.subText {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.portfolioTextPlace {
  height: 134.4px;
}
</style>
