<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class="caption">{{ formatedDate }}</div>
        <div class="headline">{{ title }}</div>
        <span class="grey--text subText">{{ body }}</span>
      </div>
    </v-card-title>
  </v-card>
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
</style>
