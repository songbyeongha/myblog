<template>
  <div>
    <vue-scheduler
      @event-clicked="eventClicked"
      @event-created="eventCreated"
      locale="kr"
      :min-date="null"
      :max-date="null"
      :labels="{
        today: '오늘',
        back: '이전달',
        next: '다음달',
        month: 'month',
        week: 'week',
        day: 'day',
        all_day: 'all-day'
      }"
      :available-views="['month']"
      :initial-date="getDate"
      initial-view="month"
      use12
      :show-time-marker="true"
      :show-today-button="true"
      :eventDisplay="eventDisplay"
      :events="events"
      :event-dialog-config="dialogConfig"
    />
    <cmodal
      v-if="showModal"
      :title="selectedEvent.name"
      :startTime="selectedEvent.startTime"
      :endTime="selectedEvent.endTime"
      :comment="selectedEvent.comments"
      :YYYYMM="makeYYYYMM(selectedEvent.date)"
      :cid="selectedEvent.cid"
      @delete="deleteCalendar()"
      @cancel="showModal = false"
    ></cmodal>
  </div>
</template>

<script>
import Vue from "vue";
import VueScheduler from "v-calendar-scheduler";
import "v-calendar-scheduler/lib/main.css";
import fbservice from "../services/FirebaseService";
import cmodal from "../components/CalendarModal";

Vue.use(VueScheduler);

export default {
  name: "Calendar",
  data() {
    return {
      dialogConfig: {
        title: "Scehdule",
        createButtonLabel: "일정 추가",
        fields: [
          {
            name: "name",
            label: "Event name",
            required: true
          },
          {
            name: "comments",
            type: "textarea",
            label: "comments"
          }
        ]
      },
      events: [],
      selectedEvent: null,
      showModal: false
    };
  },
  components: {
    cmodal
  },
  mounted() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let YYYYMM = this.getYYYYMM;
      this.events = await fbservice.getCalendar(
        this.$store.state.userEmail,
        YYYYMM
      );
    },
    eventDisplay(event) {
      return event.name;
    },
    eventClicked(event) {
      this.selectedEvent = event;
      this.showModal = true;
    },
    eventCreated(event) {
      fbservice.postCalendar(
        this.$store.state.userEmail,
        this.makeYYYYMM(event.date),
        event
      );
      this.initialize();
    },
    makeYYYYMM(date) {
      return this.$moment(date).format("YYYYMM");
    },
    deleteCalendar() {
      this.initialize();
      this.showModal = false;
    }
  },
  computed: {
    getDate() {
      return new Date();
    },
    getYYYYMM() {
      return this.$moment(new Date()).format("YYYYMM");
    }
  }
};
</script>

<style>
.v-cal-content.v-cal-content--month .v-cal-days .v-cal-day.v-cal-day--month {
  overflow: unset;
}
.v-cal-header__actions .actions-right {
  display: none;
}
</style>
