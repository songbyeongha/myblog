<template>
  <div>
    <ImgBanner>
      <div class="bannerText" slot="text">Admin Configuration</div>
    </ImgBanner>
    <v-container>
      <UserTable></UserTable>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import UserTable from "../components/UserTable";

export default {
  name: "ConfigPage",
  components: {
    ImgBanner,
    UserTable
  }
};
</script>

<style></style>
