<template>
  <div>
    <vue-scheduler
      @month-changed="monthChanged"
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
  </div>
</template>

<script>
import Vue from "vue";
import VueScheduler from "v-calendar-scheduler";
import "v-calendar-scheduler/lib/main.css";
import fbservice from "../services/FirebaseService";

Vue.use(VueScheduler);

export default {
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
      events: []
    };
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
      console.log(this.events);
    },
    eventDisplay(event) {
      return event.name;
    },
    eventClicked(event) {},
    eventCreated(event) {
      console.log(this.makeYYYYMM(event.date));
      fbservice.postCalendar(
        this.$store.state.userEmail,
        this.makeYYYYMM(event.date),
        event
      );
      this.initialize();
    },
    monthChanged(newDate) {
      console.log(newDate.getMonth() + 1);
    },
    makeYYYYMM(date) {
      return this.$moment(date).format("YYYYMM");
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
</style>
