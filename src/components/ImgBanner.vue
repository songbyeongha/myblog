<template>
  <div>
    <v-img :src="getImgUrl" aspect-ratio="1.7">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light bannerText">
            <slot name="text" />
          </span>
          <v-btn
            id="changeBtn"
            right
            top
            absolute
            color="grey lighten-4"
            @click="showImgModal()"
          >
            <v-icon>photo</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-img>
    <modal v-if="showModal === true" @ok="ifok" @cancel="ifcancel"></modal>
  </div>
</template>

<script>
import modal from "../components/ImgModal";
import store from "../store.js";

export default {
  name: "ImgBanner",
  data() {
    return {
      showModal: false,
      selected: false
    };
  },
  components: {
    modal
  },
  props: {
    text: { type: String }
  },
  mounted() {},
  computed: {
    getImgUrl() {
      return store.state.bannerImgUrl;
    }
  },
  methods: {
    ifok() {
      this.showModal = false;
    },
    ifcancel() {
      this.showModal = false;
    },
    showImgModal() {
      this.showModal = true;
      this.$store.state.defaultImg = this.$store.state.bannerImgUrl;
    }
  }
};
</script>
<style>
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
}
#changeBtn {
  margin-top: 40px;
}

.bannerText {
  transform: translateY(0%);
  animation: bannerTextAnimation 1s ease;
}

@keyframes bannerTextAnimation {
  0% {
    transform: translateY(-200%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
</style>
