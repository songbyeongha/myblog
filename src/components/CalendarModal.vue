<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <v-text-field
                :value="title"
                outline
                single-line
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :value="startTime"
                label="startTime"
                box
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                :value="endTime"
                label="endTime"
                box
                readonly
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                solo
                name="comment"
                :value="comment"
                readonly
              ></v-textarea>
            </v-flex>
            <v-flex xs12 text-xs-center style="margin-bottom: 2.5rem;">
              <v-btn round color="pink" dark @click="deleteEvent()"
                >일정 삭제</v-btn
              >
              <v-btn round color="primary" dark @click="cancel">Cancel</v-btn>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import fbservice from "../services/FirebaseService";

export default {
  props: {
    title: { type: String },
    startTime: { type: String },
    endTime: { type: String },
    comment: { type: String },
    YYYYMM: { type: String },
    cid: { type: String }
  },
  data() {
    return {};
  },
  methods: {
    deleteEvent() {
      fbservice.deleteCalendar(
        this.$store.state.userEmail,
        this.YYYYMM,
        this.cid
      );
      this.$emit("delete", "delete");
    },
    cancel() {
      this.$emit("cancel", "cancel");
    }
  }
};
</script>

<style></style>
