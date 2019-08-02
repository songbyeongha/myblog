<template>
  <div id="slidebtn">
    <v-card id="create">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon>more_horiz</v-icon>
            <v-icon>close</v-icon>
          </v-btn>
        </template>
        <goTop></goTop>

        <Bookmark></Bookmark>

        <v-btn fab small color="cyan accent-2" @click="dialog = true">
          <v-icon>add_photo_alternate</v-icon>
        </v-btn>
      </v-speed-dial>
      <imgupmodal v-if="dialog" @ok="close"></imgupmodal>
    </v-card>
  </div>
</template>
<script>
import goTop from "./goTop.vue";
import Bookmark from "./Bookmark.vue";
import FirebaseService from "@/services/FirebaseService";
import imgupmodal from "./ImgUpModal";

export default {
  name: "SlideBtn",
  components: {
    goTop,
    Bookmark,
    imgupmodal
  },
  data() {
    return {
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: true,
      left: true,
      dialog: false
    };
  },
  methods: {
    close() {
      this.dialog = false;
    }
  }
};
</script>

<style>
.size {
  height: 100px;
}

#slidebtn {
  position: fixed;
  left: 0px;
  bottom: 5px;
  z-index: 9999;
}

#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}

.modaltext {
  margin-top: 20rem;
  color: red;
}
</style>
