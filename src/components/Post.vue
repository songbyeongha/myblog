<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-card-title primary-title>
        <div class="caption">{{ formatedDate }}</div>
        <div class="headline">{{ title }}</div>
        <span class="grey--text subText postTextPlace">{{ body }}</span>
      </v-card-title>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "Post",
  props: {
    date: { type: Date },
    title: { type: String },
    body: { type: String }
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth() +
        1}월 ${this.date.getDate()}일`;
    }
  }
};
</script>
<style>
.postTextPlace {
  height: 62.4px;
}
</style>
