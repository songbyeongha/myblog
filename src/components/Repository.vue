<template>
  <div class="py-3">
    <v-layout>

      <v-flex xs12 md12 lg12>
        <h2 class="font-weight-regular header"><a v-bind:href="repos.http_url_to_repo">{{repos.path_with_namespace}}</a></h2>
        <p class="subheading mb-1 grey--text text--darken-1 font-weight-light">{{repos.namespace.name}}</p>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
import GitlabService from "@/services/GitlabService";

export default {
	name: "Repository",
	props: {
		repos: {type: null}
	},
	data() {
		return {
			stats: {}
		};
	},
	mounted() {
		this.drawStatGraph();
	},
	methods: {
		async drawStatGraph() {
			this.commits = await GitlabService.getCommits(this.repos.id);
		}
	}
};
</script>

<style scoped>
	.header {
		color:#333;
		white-space: nowrap;
	}
	@media screen and (max-width: 600px) {
		.header {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: 4vw;
		}
		.subheading{
			font-size: 3vw;
		}
	}
</style>
