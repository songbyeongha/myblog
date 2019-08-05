<template>
  <div>
    <ImgBanner imgSrc="https://source.unsplash.com/collection/827743/1600x900">
      <div class="bannerText" slot="text">Git Info Page</div>
    </ImgBanner>
    <v-container>
      <v-layout id="gitgraphdata">
        <GitGraph3></GitGraph3>
      </v-layout>
      <v-layout>
        <GitMembers></GitMembers>
      </v-layout>
      <v-layout>
        <GitCommitEvents @gitCommitEvent="insertData"></GitCommitEvents>
      </v-layout>
    </v-container>

    <Modal
      v-if="this.$store.state.ModalGit == true"
      @close="closeModal"
      id="size"
    >
      <h3 slot="header">
        Git이력
        <i class="closeBtn fas fa-times" @click="closeModal"></i>
      </h3>
      <div slot="body">
        <!-- {{ this.$store.state.ModalIndex }} -->
        <!-- {{ this.$store.state.GitMember }} -->
        <table>
          <tr>
            <th>Img</th>
            <th>User</th>
            <th>Role Permission</th>
            <th>Girlab URL</th>
          </tr>
          <tr v-for="member in getName" v-if="member.name === SaveName[modify]">
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
          <tr
            v-for="i in commitData.length > 30 ? 30 : commitData.length"
            v-if="
              commitData[i - 1].action_name == 'pushed to' &&
                commitData[i - 1].author.name === member[modify]
            "
          >
            <td>{{ commitData[i - 1].author.name }}</td>
            <td>{{ commitData[i - 1].push_data.commit_title }}</td>
            <td>{{ commitData[i - 1].created_at.slice(0, 10) }}</td>
          </tr>
        </table>
      </div>
    </Modal>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import GitGraph3 from "../components/GitGraph3";
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
    GitGraph3,
    GitMembers,
    GitCommitEvents,
    Modal
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
    modify() {
      return this.$store.state.ModalIndex;
    },
    getName() {
      this.SaveName[0] = this.$store.state.ModalGitMember[1].name;
      this.SaveName[1] = this.$store.state.ModalGitMember[2].name;
      this.SaveName[2] = this.$store.state.ModalGitMember[0].name;
      return this.$store.state.ModalGitMember;
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
