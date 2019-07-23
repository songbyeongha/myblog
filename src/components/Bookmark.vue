<template>
  <div>
    <v-btn id="favorite" fab dark small color="pink" @click="addBookmark">
      <v-icon>bookmark_border</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Bookmark",
  created() {
    if (window.Notification) {
      Notification.requestPermission(function(result) {
        if (result == "denied") {
          alert(
            "알림을 차단하셨습니다. \n브라우저의 사이트 설정에서 변경하실 수 있습니다."
          );
          return false;
        }
      });
    }
  },
  methods: {
    addBookmark() {
      let bookmarkURL = window.location.href;
      let bookmarkTitle = document.title;
      let triggerDefault = false;

      if (window.sidebar && window.sidebar.addPanel) {
        // FireFox version < 23
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, "");
      } else if (
        (window.sidebar &&
          navigator.userAgent.toLowerCase().indexOf("firefox") > -1) ||
        (window.opera && window.print)
      ) {
        // FireFox version >= 23 and Opera Hotlist
      } else if (window.external && "AddFavorite" in window.external) {
        // IE Favorite
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
      } else {
        // Webkit - Safari/Chrome
        alert(
          (navigator.userAgent.toLowerCase().indexOf("max") != -1
            ? "Cmd"
            : "Ctrl") + "+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다."
        );
      }

      return triggerDefault;
    }
  }
};
</script>

<style>
@media screen and (max-width: 600px) {
  #favorite {
    display: none;
  }
}
</style>
