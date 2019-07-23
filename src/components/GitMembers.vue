<template>
  <v-layout column px-4>
    <h2 class="headline mb-5 mx-auto" >Information of Members</h2>
    <div style="overflow-x:auto">
    <!-- <v-flex v-for="i in 4">
      <p>{{gitmembers[i-1].name}}</p> -->
<!-- <Repository :repos="gitmembers[i - 1]"></Repository> -->
      <table>
        <tr>
          <th></th>
          <th>NAME</th>
          <th>USERNAME</th>
          <th>Role Permission</th>
          <th>Girlab URL</th>
        </tr>
         <tr v-for="member in gitmembers">
          <td>
            <v-img :src="member.avatar_url" class="resize"/>
          </td>
          <td>{{member.name}}</td>
          <td>{{member.username}}</td>
          <td v-if= "member.access_level==40">Maintainer</td>
          <td><a v-bind:href="member.web_url">{{member.web_url}}</a></td>
        </tr>
      </table>
    </div>
    <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import GitlabService from "@/services/GitlabService";
import GitMembers from "@/components/GitMembers";
import store from "../store.js"
export default {
	name: "GitMembers",
	props: {

	},
	data() {
		return {
			gitmembers: []
		};
	},
	components: {
		GitMembers
	},
	mounted() {
		this.getMembers("6085");
	},
	methods: {
		async getMembers(teamName) {
			const response = await GitlabService.getMembers(teamName);
			if(response.status !== 200) {
				return;
			}

      this.gitmembers = response.data;
      store.state.ModalGitMember = this.gitmembers;  
		}
	}
};
</script>
<style>
table{
  width:100%;
  border-collapse:collapse;
}
table th{
  font-size:1.2rem;
}
table tr{
  height:2rem;
  text-align:center;
  border-bottom:1px solid #505050;
}
table tr:first-of-type{
  border-top:2px solid #404040;
}
table tr td{
  padding:1rem 0;
  font-size:1.1rem;
}
.resize {
  height: 20px;
  width: 20px;
}
</style>
