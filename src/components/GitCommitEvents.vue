<template>
  <v-layout column px-4>
    <h2 class="headline mb-5 mx-auto mt-5">Latest Commit</h2>
    <div style="overflow-x:auto">
      <table>
        <tr>
          <th>USERNAME</th>
          <th>Branch</th>
          <th>Latest Commit</th>
          <th>Created At</th>
        </tr>
        <tr
          v-bind:key="item.created_at"
          v-for="item in gitCommitEventLimit"
        >
          <td>{{ item.author.name }}</td>
          <td>{{ item.push_data.commit_title }}</td>
          <td>{{ item.push_data.ref }}</td>
          <td>{{ item.created_at.slice(0, 10) }}</td>
        </tr>
      </table>
    </div>
    <v-divider></v-divider>
  </v-layout>
</template>

<script>
import GitlabService from "@/services/GitlabService";
import store from "../store.js";
export default {
  name: "GitCommitEvents",
  props: {},
  data() {
    return {
      gitCommitEvents: []
    };
  },
  mounted() {
    this.getCommitEvents("7550");
  },
  computed:{
    gitCommitEventLimit : function(){
      return this.gitCommitEvents.slice(0,25).filter(item => item.action_name == 'pushed to');
    }
  },
  methods: {
    async getCommitEvents(teamName) {
      const response = await GitlabService.getCommitEvents(teamName);
      if (response.status !== 200) {
        return;
      }
      this.gitCommitEvents = response.data;
      this.$emit("gitCommitEvent", this.gitCommitEvents);
      store.state.GitFindMember = this.gitCommitEvents;
    }
  }
};
</script>
<style>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 1px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
</style>
