<template>
  <div class="mx-auto mb-5">
    <v-layout>
      <div class="row">
        <div>
          <h2 class="headline mb-3 text-xs-center">Git Repository Graph</h2>
          <p hidden>{{ membercommitdata }}</p>
          <div id="chart"></div>
        </div>
      </div>
    </v-layout>
  </div>
</template>

<script>
import GitCommitEvents from "@/components/GitCommitEvents";
import GitlabService from "@/services/GitlabService";
import ApexCharts from "apexcharts";
import Modal from "./Modal.vue";
import store from "../store.js";

export default {
  name: "GitCommitEvents",
  props: {},
  components: {
    Modal
  },
  data() {
    return {
      gitcommitevents: [],
      membercommitdata: []
    };
  },
  components: {
    GitCommitEvents
  },
  mounted() {
    this.getCommitEvents("7550");
  },
  updated() {
    this.gitGraph();
  },
  methods: {
    async getCommitEvents(teamName) {
      const response = await GitlabService.getCommitEvents(teamName);
      if (response.status !== 200) {
        return;
      }
      this.gitcommitevents = response.data;
      this.membercommitdata = [0, 0, 0, 0];
      for (var i = 0; i < this.gitcommitevents.length; i++) {
        if (
          this.gitcommitevents[i].action_name == "pushed to" ||
          this.gitcommitevents.action_name == "pushed"
        ) {
          if (this.gitcommitevents[i].author.name == "신민석") {
            this.membercommitdata[0] += 1;
          } else if (this.gitcommitevents[i].author.name == "송병하") {
            this.membercommitdata[1] += 1;
          } else if (this.gitcommitevents[i].author.name == "Yoon,Eunsol") {
            this.membercommitdata[2] += 1;
          }
        }
      }
    },
    gitGraph() {
      var options = {
        chart: {
          events: {
            dataPointSelection: function(event, chartContext, config) {
              store.state.ModalGit = true;
              store.state.ModalIndex = config.dataPointIndex;
            }
          },
          height: 500,
          width: 800,
          type: "donut"
        },
        series: this.membercommitdata,
        labels: ["신민석", "송병하", "Yoon,EunSol"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                posotion: "bottom"
              }
            }
          }
        ]
      };

      var chart = new ApexCharts(document.querySelector("#chart"), options);

      chart.render();
    }
  }
};
</script>
