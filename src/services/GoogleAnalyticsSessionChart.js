$(document).ready(function() {
  var el = 0;
  var timer1;
  timer1 = setInterval(function() {
    if (el >= 3) {
      clearInterval(timer1);
    }
    gapi.analytics.ready(function() {
      el++;
      gapi.analytics.auth.authorize({
        container: "embed-api-auth-container",
        clientid:
          "1021517105793-im4pa4jpic53t58anbqduhkpvgs80l3m.apps.googleusercontent.com"
      });

      var viewSelector = new gapi.analytics.ViewSelector({
        container: "view-selector-container"
      });

      // Render the view selector to the page.
      viewSelector.execute();

      var dataChart = new gapi.analytics.googleCharts.DataChart({
        query: {
          metrics: "ga:sessions",
          dimensions: "ga:date",
          "start-date": "30daysAgo",
          "end-date": "yesterday"
        },
        chart: {
          container: "chart-container",
          type: "LINE",
          options: {
            width: "100%"
          }
        }
      });

      viewSelector.on("change", function(ids) {
        dataChart.set({ query: { ids: ids } }).execute();
      });
    });
  }, 3000);
}); //onload
