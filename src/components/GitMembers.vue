<template>
  <v-layout column px-4>
    <h2 class="headline mb-5 mx-auto">Information of Members</h2>
    <div style="overflow-x:auto">
      <table>
        <tr>
          <th></th>
          <th>NAME</th>
          <th>USERNAME</th>
          <th>Role Permission</th>
          <th>Girlab URL</th>
        </tr>
        <tr v-bind:key="member.id" v-for="member in gitmembers">
          <td>
            <v-img :src="member.avatar_url" class="resize" />
          </td>
          <td>{{ member.name }}</td>
          <td>{{ member.username }}</td>
          <td v-if="member.access_level == 40">Maintainer</td>
          <td>
            <a v-bind:href="member.web_url">{{ member.web_url }}</a>
          </td>
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
  name: "GitMembers",
  props: {},
  data() {
    return {
      gitmembers: []
    };
  },
  mounted() {
    this.getMembers("7550");
  },
  methods: {
    async getMembers(teamName) {
      const response = await GitlabService.getMembers(teamName);
      if (response.status !== 200) {
        return;
      }
      this.gitmembers = response.data;
      store.state.ModalGitMember = this.gitmembers;
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
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.resize {
  height: 20px;
  width: 20px;
}
</style>
