<template>
  <v-layout column px-4>
    <h2 class="headline mb-5 mx-auto mt-5">Latest Commit</h2>
    <div style="overflow-x:auto">
      <!-- <v-flex v-for="i in 4">
      <p>{{gitmembers[i-1].name}}</p>-->
      <!-- <Repository :repos="gitmembers[i - 1]"></Repository> -->
      <table>
        <tr>
          <th>USERNAME</th>
          <th>Branch</th>
          <th>Latest Commit</th>
          <th>Created At</th>
        </tr>
        <tr
          v-for="i in gitcommitevents.length > 25 ? 25 : gitcommitevents.length"
          v-if="gitcommitevents[i - 1].action_name == 'pushed to'"
        >
          <td>{{ gitcommitevents[i - 1].author.name }}</td>
          <td>{{ gitcommitevents[i - 1].push_data.commit_title }}</td>
          <td>{{ gitcommitevents[i - 1].push_data.ref }}</td>
          <td>{{ gitcommitevents[i - 1].created_at.slice(0, 10) }}</td>
        </tr>
      </table>
    </div>
    <v-divider></v-divider>
  </v-layout>
</template>

<script>
import GitlabService from "@/services/GitlabService";
import GitCommitEvents from "@/components/GitCommitEvents";
import store from "../store.js";
export default {
  name: "GitCommitEvents",
  props: {},
  data() {
    return {
      gitcommitevents: []
    };
  },
  components: {
    GitCommitEvents
  },
  mounted() {
    this.getCommitEvents("6085");
  },
  methods: {
    async getCommitEvents(teamName) {
      const response = await GitlabService.getCommitEvents(teamName);
      if (response.status !== 200) {
        return;
      }
      this.gitcommitevents = response.data;
      this.$emit("gitCommitEvent", this.gitcommitevents);
      store.state.GitFindMember = this.gitcommitevents;
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
