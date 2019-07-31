<template>
  <v-container>
    <v-layout>
      <v-flex xs11>
        <v-card v-for="i in comments.length" :key="i" class="comments">
          <v-flex>{{ comments[i - 1] }}</v-flex>
        </v-card>
      </v-flex>
      <v-flex xs11 class="input">
        <v-textarea
          outline
          label="Outline textarea"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import store from "../store";
import fbstore from "../services/FirebaseService";

export default {
  name: "Comments",
  props: {
    comments: []
  },
  data() {
    return {
      canWrite: false
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {

    }
  },
  computed: {}
};
</script>

<style></style>
