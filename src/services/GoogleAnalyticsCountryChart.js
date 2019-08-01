$( document ).ready(function() { 
    var el2 = 0;
var timer2;
timer2 = setInterval(function(){
    if(el2>=3){
        clearInterval(timer2);
    }
gapi.analytics.ready(function() {
el2++;
    /**
     * Authorize the user immediately if the user has already granted access.
     * If no access has been created, render an authorize button inside the
     * element with the ID "embed-api-auth-container".
     */
    gapi.analytics.auth.authorize({
      container: 'embed-api-auth-container',
      clientid: '1021517105793-im4pa4jpic53t58anbqduhkpvgs80l3m.apps.googleusercontent.com'
    });
  
  
    /**
     * Create a ViewSelector for the first view to be rendered inside of an
     * element with the id "view-selector-1-container".
     */
    var viewSelector1 = new gapi.analytics.ViewSelector({
      container: 'view-selector-1-container'
    });
  
    // Render both view selectors to the page.
    viewSelector1.execute();
   
  
  
    /**
     * Create the first DataChart for top countries over the past 30 days.
     * It will be rendered inside an element with the id "chart-1-container".
     */
    var dataChart1 = new gapi.analytics.googleCharts.DataChart({
      query: {
        metrics: 'ga:sessions',
        dimensions: 'ga:country',
        'start-date': '30daysAgo',
        'end-date': 'yesterday',
        'max-results': 6,
        sort: '-ga:sessions'
      },
      chart: {
        container: 'chart-1-container',
        type: 'PIE',
        options: {
          width: '100%',
          pieHole: 4/9
        }
      }
    });
  
  
    /**
     * Update the first dataChart when the first view selecter is changed.
     */
    viewSelector1.on('change', function(ids) {
      dataChart1.set({query: {ids: ids}}).execute();
    });
  
  });
}, 3000);
});