<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/collection/827743/1600x900">
      <div class="bannerText" slot="text">Git Info Page</div>
    </ImgBanner>
    <v-container>
      <v-layout id="gitgraphdata">
        <GitGraph class="hidden-sm-and-down"></GitGraph>
      </v-layout>
      <v-layout>
        <GitMembers></GitMembers>
      </v-layout>
      <v-layout>
        <GitCommitEvents @gitCommitEvent="insertData"></GitCommitEvents>
      </v-layout>
    </v-container>

    <Modal v-if="this.$store.state.ModalGit == true" @close="closeModal" id="size">
      <h3 slot="header">
        Git이력
        <i class="closeBtn fas fa-times" @click="closeModal"></i>
      </h3>
      <div slot="body">
        <table>
          <tr>
            <th>Img</th>
            <th>User</th>
            <th>Role Permission</th>
            <th>Girlab URL</th>
          </tr>
          <tr :key="member.id" v-for="member in getName">
            <td>
              <v-img :src="member.avatar_url" class="resize" />
            </td>
            <td>{{ member.name }}</td>
            <td v-if="member.access_level == 40">Maintainer</td>
            <td>
              <a v-bind:href="member.web_url">{{ member.web_url }}</a>
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <th>USERNAME</th>
            <th>Latest Commit</th>
            <th>Created At</th>
          </tr>
          <tr :key="item.id" v-for="item in getCommitEventLimit">
            <td>{{ item.author.name }}</td>
            <td>{{ item.push_data.commit_title }}</td>
            <td>{{ item.created_at.slice(0, 10) }}</td>
          </tr>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import GitGraph from "../components/GitGraph";
import GitMembers from "../components/GitMembers";
import GitCommitEvents from "../components/GitCommitEvents";
import Modal from "../components/Modal.vue";
import store from "../store.js";
export default {
  name: "GitInfoPage",
  data() {
    return {
      commitData: [],
      idx: -1,
      member: [],
      GitmemberName: [],
      SaveName: []
    };
  },
  components: {
    ImgBanner,
    GitGraph,
    GitMembers,
    GitCommitEvents,
    Modal
  },
  mounted() {
    store.state.ModalGit = false;
  },
  methods: {
    closeModal() {
      store.state.ModalGit = false;
    },
    insertData(data) {
      this.commitData = data;
      this.member = store.state.GitMember;
    }
  },
  computed: {
    getModalIdx() {
      return this.$store.state.ModalIndex;
    },
    getName() {
      this.SaveName[0] = this.$store.state.ModalGitMember[1].name;
      this.SaveName[1] = this.$store.state.ModalGitMember[2].name;
      this.SaveName[2] = this.$store.state.ModalGitMember[0].name;
      return this.$store.state.ModalGitMember.filter(
        item => item.name === this.SaveName[this.getModalIdx]
      );
    },
    getCommitEventLimit: function() {
      return this.commitData
        .slice(0, 30)
        .filter(
          item =>
            item.action_name == "pushed to" &&
            item.author.name === this.SaveName[this.getModalIdx]
        );
    }
  }
};
</script>

<style>
@media screen and (max-width: 380px) {
  #gitgraphdata {
    display: none;
  }
}
#size .modal-container {
  width: 750px;
}
</style>
